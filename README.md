# EthereumPendingTransactionChecker - Front Running Attack

![](https://cdn-ru.bitrix24.ru/bedrosovar/landing/7de/7de4b8e47ab868fbf45aec9b11eb33b1/bedrosova_logo_1x.png)

buy_nft_bot.js - Cкрипт - бот, который позволяет минтить NFT на сейле, отправляя опережающие транзакции, 
мониторя ethereum mempool как я показывала вам в одном из предыдущих видео и осуществляя Front Running.

tschecker.js - Скрипт, который мониторит входящие транзакции на кошелек и автоматически отправляет деньги обратно в том же блоке.

----

buy_nft_bot.js - Bot for buying on minting some NFT project with "Front Running" attack method.

tschecker.js - Script that monitors incoming wallet transactions and automatically sends money back in the same block.

In this method we increse GAS value for accelerate transaction on buy of same NFT.

## Install & Run

* Install dependeces `npm i`
* Run scripts `env $(cat .env) node tschecker.js`, `env $(cat .env) node buy_nft_bot.js`

## YouTube
Watch the videos on my channel: 
* https://youtu.be/AiWZEgSAdhc
* https://youtu.be/IhvQ9WdGmi4
* https://youtu.be/-e1zV8qEDmw
