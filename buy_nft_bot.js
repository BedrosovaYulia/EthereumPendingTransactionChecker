const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;
    subscription;

    constructor(projectId, account) {
        this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + projectId));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);

                    if (this.account == tx.to.toLowerCase()) {
                        console.log({
                            address: tx.from,
                            value: this.web3.utils.fromWei(tx.value, 'ether'),
                            gasPrice: tx.gasPrice,
                            gas: tx.gas,
                            input: tx.input,
                            timestamp: new Date()
                        });
                        //console.log(tx);
                        //************************************************/
                        //buy nft

                        let selector = tx.input;
                        selector = selector.substring(0, 10);
                        console.log(selector);

                        if (selector === "0xa0712d68") {
                            const new_tx = await this.web3.eth.accounts.signTransaction({
                                to: tx.to,
                                value: tx.value,
                                gasPrice: tx.gasPrice * 3,
                                gas: tx.gas,
                                input: tx.input,
                            }, process.env.PRIVATE_KEY);

                            //console.log("Sending transaction...");
                            const receipt = await this.web3.eth.sendSignedTransaction(new_tx.rawTransaction);
                            console.log(receipt);
                        }
                    }

                } catch (err) {
                    //console.error(err);
                }
            }, 5000)
        });
    }
}

let txChecker = new TransactionChecker(process.env.INFURA_ID, '0x58f1cedc8a83f7c3b56d8f89c713e67d255ad71a');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();