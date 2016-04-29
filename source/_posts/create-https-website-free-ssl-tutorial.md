title: 架個免費 HTTPS 網站 - Let's Encrypt 教學
date: 2016-04-28 19:10:47
tags:
- https
- ssl
- nginx
---

這篇文章會以 [nginx](http://nginx.org/) 架在 [Digital Ocean](https://www.digitalocean.com/) 上的 Ubuntu 14.04.4 LTS 為範例，講解如何使用 [Let's Encrypt](https://letsencrypt.org/) 套件裝上免費的 [SSL](https://zh.wikipedia.org/wiki/%E5%82%B3%E8%BC%B8%E5%B1%A4%E5%AE%89%E5%85%A8%E5%8D%94%E8%AD%B0) 憑證，參考自 [Digital Ocean 的教學](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04)。

<img src="/images/create-https-website-free-ssl-tutorial/letsencrypt-logo.png" width="400">

這篇文章包括：

- [第一步：建立基本 Server](/2016/04/28/create-https-website-free-ssl-tutorial/#create-basic-server)
- [第二步：安裝 Let's Encrypt](/2016/04/28/create-https-website-free-ssl-tutorial/#install-letsencrypt)
- [第三步：安裝憑證](/2016/04/28/create-https-website-free-ssl-tutorial/#install-certificate)
- [第四步：更新 Nginx Server 設定](/2016/04/28/create-https-website-free-ssl-tutorial/#update-server)
- [第五步：設定自動更新憑證](/2016/04/28/create-https-website-free-ssl-tutorial/#set-auto-update)

<!-- more -->

# <a name="create-basic-server"></a> 第一步：建立基本 Server

在看這篇文章之前，必須要先有個[域名](https://zh.wikipedia.org/zh-tw/%E5%9F%9F%E5%90%8D) (Domain Name)，可以在 [Godaddy](https://tw.godaddy.com/) 購買[三十元台幣一年](http://www.retailmenot.com/view/godaddy.com)的便宜域名。也要有一台主機，這邊是用 Digital Ocean 的機器，如果你是學生，那 [Github 有送你 1500 元免費額度](https://education.github.com/pack)。

在架 HTTPS Server 前，先把一般 HTTP Server 架起來。基本 nginx 設定如下，以下範例以 example.com 作為域名，複製貼上時**記得更改成自己的**。

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    location ~ / {
        proxy_pass  http://127.0.0.1:good-port;
    }
}
```

上面程式會把 `example.com` 進來的請求導向至 `http://127.0.0.1:good-port` 架設的伺服器。如果不能了解以上程式碼，可以參考 [Nginx 教學](https://www.google.com.tw/#safe=off&q=nginx+%E6%95%99%E5%AD%B8)。

# <a name="install-letsencrypt"></a> 第二步：安裝 Let's Encrypt

更新套件清單

```bash
sudo apt-get update
```

安裝相關套件

```bash
sudo apt-get -y install git bc
```

下載 letsencrypt 套件至 `/opt/letsencrypt`

```bash
sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
```

# <a name="install-certificate"></a> 第三步：安裝憑證

這邊會用到 Webroot plugin 來安裝憑證，而 Webroot plugin 會去找伺服器的 `/.well-known` 這個目錄，所以要在 nginx config 加入

```nginx
location ~ /.well-known {
    allow all;
}
```

現在 `/etc/nginx/site-available/default` 應該變成

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    location ~ / {
        proxy_pass  http://127.0.0.1:good-port;
    }
    location ~ /.well-known {
        allow all;
    }
}
```

更改設定完讓 nginx 重新載入

```bash
sudo service nginx reload
```

現在就可以用 Let's Encrypt 的 webroot 插件來安裝憑證了

```bash
cd /opt/letsencrypt
sudo ./letsencrypt-auto certonly -a webroot --webroot-path=/your/website/root -d example.com -d www.example.com
```

其中 webroot-path 要設定伺服器公開路徑下的根目錄，Let's Encrypt 會在目錄下產生 `.well-known` 這個資料夾。

如果是安裝遇到 `cryptography` 錯誤，可以參考 [cryptography 錯誤排解](https://github.com/letsencrypt/letsencrypt/issues/2324)。

如果步驟中有要輸入信箱的地方，可以輸入常用信箱，Let's Encrypt 會在憑證快要到期前寄信通知。目前**憑證期限是三個月**，不過 Let's Encrypt 也可以利用 `crontab` 自動續約，[文末會講到](#set-auto-update)。

如果成功了，就可以看到：

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/example.com/fullchain.pem. Your cert will
   expire on XXXX-XX-XX. To obtain a new version of the certificate in
   the future, simply run Let's Encrypt again.
 - If you like Let's Encrypt, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

如此憑證就申請好了，接下來為了安全性考量，可以來產生一把 [Diffie-Hellman 密鑰](https://zh.wikipedia.org/wiki/%E8%BF%AA%E8%8F%B2-%E8%B5%AB%E7%88%BE%E6%9B%BC%E5%AF%86%E9%91%B0%E4%BA%A4%E6%8F%9B)，產生密鑰可能會花上一段時間。

```bash
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

# <a name="update-server"></a> 第四步：更新 Nginx Server 設定

現在要把原本的 HTTP 改成 HTTPS，所以把原本的 80 port 設定改成 443，並加上 SSL 憑證的設定

```nginx
listen 443 ssl;
server_name example.com www.example.com;

ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
```

為了讓 SSL 更安全，加上剛剛產生的 Diffie-Hellman 密鑰

```nginx
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_dhparam /etc/ssl/certs/dhparam.pem;
ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_stapling on;
ssl_stapling_verify on;
add_header Strict-Transport-Security max-age=15768000;
```

現在 `/etc/nginx/site-available/default` 應該會長得像這樣

```nginx
server {
    listen 443 ssl;
    server_name example.com www.example.com;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;
    add_header Strict-Transport-Security max-age=15768000;

    location ~ / {
        proxy_pass  http://127.0.0.1:good-port;
    }
    location ~ /.well-known {
        allow all;
    }
}
```

這樣 HTTPS 伺服器的設定就完成了，不過為了讓原本連上 HTTP 的使用者可以自動轉向 HTTPS，可以加上

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
```

更改設定完讓 Nginx 重新載入

```bash
sudo service nginx reload
```

做到這一步，就可以成功看到網站前面多出來的 HTTPS 啦！

<img src="/images/create-https-website-free-ssl-tutorial/https.png" width="200">

可以[看看網站的 SSL 測試](https://www.ssllabs.com/ssltest/analyze.html)，做出來應該會是 A+。

<img src="/images/create-https-website-free-ssl-tutorial/https-report.png" width="800">

# <a name="set-auto-update"></a> 第五步：設定自動更新憑證

Let's Encrypt 可以更新憑證，renew 會檢查當前憑證，如果快要過期就會自動續約

```bash
/opt/letsencrypt/letsencrypt-auto renew
```

所以只要把自動更新設定在 crontab 裡就好了

Let's Encrypt 是三個月過期，可以設定每週一早上 2:30 檢查憑證，2:35 重啟 nginx server，這樣就不怕憑證過期了

```bash
crontab -e
```

編輯 crontab，設定排程

```bash
30 2 * * 1 /opt/letsencrypt/letsencrypt-auto renew >> /var/log/le-renew.log
35 2 * * 1 /etc/init.d/nginx reload
```

若是遇到問題還是有其他指教，都歡迎留言。
