title: 如何製作 Hubot Script 推上 npm
date: 2016-04-24 11:40:20
tags:
- npm
- hubot
- bot
---

最近寶寶梗當紅，剛好又在玩 Hubot，就想把這兩個元素結合在一起。於是，[hubot-boubou](https://www.npmjs.com/package/hubot-boubou) 就這麼誕生了！

<img src="/images/20160424-hubot.png" width="250">

這篇文章會分享：

- [一、簡單介紹 Hubot](/2016/04/24/create-hubot-script-and-publish-to-npm/#hubot-intro)
- [二、怎麼做一個 Hubot Script](/2016/04/24/create-hubot-script-and-publish-to-npm/#build-hubot-script)
- [三、把做好的 Hubot Script 推上 npm](/2016/04/24/create-hubot-script-and-publish-to-npm/#pulish-to-npm)

<!-- more -->

# <a name="hubot-intro"></a> 一、簡單介紹 Hubot

要做一個 Hubot Script 前，需要先有一隻 [Hubot](https://hubot.github.com/)，Hubot 是一個在 [Slack](https://slack.com/) 上可以用的 app，可以在聊天頁面以文字的方式對 Hubot 下指令，Hubot 就會做設定的動作。

舉例來說：

<img src="/images/20160424-hubot-boubou-example1.png" width="350">

這是簡單的以文字回應文字的方式。

除此之外，Hubot 還可以做到 **HTTP Request**、**cron 定時排程**、**執行 command line** 等功能，像是：

- 自動部署網站
- 定時檢查網站
- 網站流量分析
- 下載量分析
- 決定晚餐吃什麼
- 產生一張可愛的圖片
- ...

這些都是可以客製化的 Hubot Script，讓 Slack 的功能再更加豐富。網路上已經有[很多人分享腳本了](https://www.npmjs.com/search?q=hubot)，應該可以找到很多不錯用的，或參考一下再寫出適合自己專屬的腳本，應該對整個工作流程可以方便許多。

Hubot 是用 [CoffeeScript](http://coffeescript.org/) 開發，如果沒有學過可以先看一下官方文件。如何建造一隻 Hubot 可以參考 [在 slack 建立 hubot](http://code.kpman.cc/2016/04/18/%E5%9C%A8-slack-%E5%BB%BA%E7%AB%8B-hubot/)。

# <a name="build-hubot-script"></a> 二、怎麼做一個 Hubot Script

製作 Hubot Script 需要先安裝

```
npm install -g yo generator-hubot

```

安裝後就可以建個放腳本的資料夾，進去後用剛剛裝的 `yo` 初始化

```
mkdir test
cd test
yo hubot:script
```

安裝的過程中會出現填寫 Owner、Script name、Description、Keywords 等資訊，那些資訊之後還可以在 `package.json` 裡面更改，故可以先按 enter 跳過，或先隨便打一下即可。

安裝完後，就會看到資料夾裡產生一些預設的檔案：

<img src="/images/20160424-hubot-script-tree.png" width="250">

這是一個 [TDD](https://en.wikipedia.org/wiki/Test-driven_development) 的架構，`src` 裡放功能的程式碼，`test` 放測試的程式碼，一開始預設已經有產生預設代碼了，所以可以直接跑測試

```
npm test
```

可以看到測試都通過了。接下來就看想要做什麼，就把程式改成自己想要的吧！

基礎語法可以參考 [Hubot Document](https://hubot.github.com/docs/) ，製作腳本的方法可以參考 [Hubot Scripting](https://github.com/github/hubot/blob/master/docs/scripting.md#creating-a-script-package) 。

# <a name="pulish-to-npm"></a> 三、把做好的 Hubot Script 推上 npm

推上 npm 也不會太複雜，在[第二步](#build-hubot-script)時我們先建出來的專案已經有產生 `package.json` 了，現在就把裡面的資訊補完善即可，版本可以改成 `1.0.0` 或是開發中用 `0.0.0` 也可以，版本號的邏輯可以參考 [Semantic Version](http://semver.org/lang/zh-TW/)。

接下來就建立 npm 的 user

```
npm adduser
```

輸入完基本資料後，就可以發布了

```
npm publish
```

發布完成的 npm package 別人就可以直接 `npm install YOUR_PACKAGE_NAME` 下載了，更詳細的資訊可以參考 [npm 官網的手把手教學](https://docs.npmjs.com/getting-started/publishing-npm-packages)。
