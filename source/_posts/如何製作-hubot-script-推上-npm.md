title: 如何製作 hubot script 推上 npm
date: 2016-04-24 11:40:20
tags:
- npm
- hubot
- bot
---

最近寶寶梗當紅，剛好又在玩 hubot，就想把這兩個元素結合在一起。於是，[hubot-boubou](https://www.npmjs.com/package/hubot-boubou) 就這麼誕生了。

這篇文章會分享一下：

- 簡單介紹 Hubot
- 怎麼做一個 hubot script
- 怎麼把做好的 hubot script 推上 npm

# 簡單介紹 Hubot

要做一個 hubot script 前，你需要先有一隻 [hubot](https://hubot.github.com/)，hubot 是一個在 [slack](https://slack.com/) 上可以用的 app，可以在聊天頁面以文字的方式對 hubot 下指令，他就會做你設定的動作。

舉例來說：

![](images/如何製作-hubot-script-推上-npm/hubot-boubou-example1.png)

這是簡單的以文字回應文字的方式。

除此之外，hubot 還可以做到 http request、cron 定時排程、執行 command line 等功能 (簡直可以做到任何事了！)

比較常被用到的像是：

- 自動部署網站
- 定時檢查網站
- 網站流量分析
- 下載量分析
- 決定晚餐吃什麼
- 產生一張可愛的圖片
- ...

這些都可以客製化的 hubot script，網路上已經有[很多人分享腳本](https://www.npmjs.com/search?q=hubot)，參考一下在寫出適合你專屬的腳本，應該對整個開發或是日常都可以方變許多。

# 怎麼做一個 hubot script

# 怎麼把做好的 hubot script 推上 npm
