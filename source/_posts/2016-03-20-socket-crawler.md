title: Bitfinex / OKCoin socket crawler
date: 2017-03-20 21:48:20
tags: bitfinex, okcoin, crawler
---

<img src="/images/socket-crawler/bitcoin.png" width="250">

前陣子串了 OKCoin 期貨 API，上週串了 Bitfinex API，都蠻好串的，都是同一個套路。

- [OKCoin socket crawler](https://github.com/Asoul/okcoin-socket-crawler)
- [Bitfinex socket crawler](https://github.com/Asoul/bitfinex-socket-crawler)

串 Websocket 好處是流量低、速度快，穩穩的資料就一直來，缺點是可能要怕斷線，兩家都有 Heart Beat 的機制可以接，沒心跳就重連。

抓個歷史紀錄一下才有資料回測模型啊。
