import {
    web3,
    wss
} from '../../bin/www';
import {
    sequelize,
    login,
    partner_details,
    partner_roles,
    roles,
    ether_transcations
} from './../../models';
import {
    request
} from 'express';
const yamlConfig = require('yaml-config');

const config = yamlConfig.readConfig('config.yml');
const trackBlockchain = () => {
    var subscription;
    const request = require('request');
    const adminAddress = config.adminAddress;
    const contractAddress = config.contractAddress;
    try {

        // Subscribe to WebSocket
        subscription = web3.eth.subscribe('logs', {
            // fromBlock: 1,
            address: contractAddress,
            topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
        }, function () {}).on("data", function (trxData) {
            console.dir(trxData, {
                depth: null
            })
            // console.log('-----------------------------------------------------------------------')
            function formatAddress(data) {
                var step1 = web3.utils.hexToBytes(data);
                for (var i = 0; i < step1.length; i++)
                    if (step1[0] == 0) step1.splice(0, 1);
                return web3.utils.bytesToHex(step1);
            }

            if (formatAddress(trxData.topics['2']).toLowerCase() === adminAddress.toLowerCase()) {
                var transferAmount = web3.utils.fromWei(web3.utils.hexToNumberString(trxData.data), 'ether');
                let wsdata = [];
                partner_details.findAll({
                    where: {
                        ether_account: {
                            $ne: null
                        }
                    }
                }).then(partnerdata => {
                    partnerdata.forEach((partner, index) => {
                        if (partner.ether_account) {
                            if (formatAddress(trxData.topics['1']).toLowerCase() === partner.ether_account.toLowerCase()) {
                                var url = 'https://' +
                                    config.httpAPI.url +
                                    '/api?module=transaction&action=gettxreceiptstatus&txhash=' +
                                    trxData.transactionHash +
                                    '&apikey=' +
                                    config.httpAPI.apiKey;
                                console.log(url, 'url -----------------------------------url')
                                request({
                                    url: url,
                                    method: 'GET',
                                    headers: {
                                        "content-type": "application/json"
                                    }
                                }, function (error, response, body) {
                                    body = JSON.parse(body);
                                    console.log(body,"-------------------------------body")
                                    var status = "Pending";
                                    if (body.result.status === "1") {
                                        status = "Success";
                                    } else if (body.result.status === "0") {
                                        status = "Error";
                                    } else {
                                        status = "Pending";
                                    }

                                    var data = {};
                                    data.login_id = partner.login_id;
                                    data.from_address = trxData.topics['1'];
                                    data.to_address = trxData.topics['2'];
                                    data.block_number = trxData.blockNumber;
                                    data.transcation_hash = trxData.transactionHash;
                                    data.value = transferAmount;
                                    data.status = status;
                                    console.log(data,"=========================data")
                                    ether_transcations.findOne({
                                        where: {
                                            login_id: data.login_id,
                                            transcation_hash: trxData.transactionHash,
                                            from_address: trxData.topics['1']
                                        }
                                    }).then(transcations => {
                                        console.log(transcations,"=======================transcations")
                                        if (!transcations) {
                                            ether_transcations.create(data).then(transcations_data => {
                                                console.log("data Inserted!!!!!!!!!!!!!!!!!!!")
                                                var wsData = { login_id: partner.login_id, method: 'TrasactionUpdate' };
                                                wss.clients.forEach(function each(client) {
                                                    client.send(JSON.stringify(wsData));
                                                });
                                                // var creditsdata = {};
                                                // wsdata.push(transcations_data.dataValues);
                                                // creditsdata.upload_amount = data.value * config.TokenValue;
                                                // partner_details.findOne({
                                                //     where: {
                                                //         login_id: partner.login_id
                                                //     }
                                                // }).then(partnerdetails => {
    
                                                //     creditsdata.amount = partnerdetails.amount + creditsdata.upload_amount;
                                                //     partner_details.update(creditsdata, {
                                                //         where: {
                                                //             login_id: partner.login_id
                                                //         }
                                                //     }).then(creditsdata => {
                                                //         if (partnerdata.length == (index + 1)) {
                                                //             console.log(wsdata);
                                                //             wss.clients.forEach(function each(client) {
                                                //                 client.send(JSON.stringify(wsdata));
                                                //             });
                                                //         }
                                                //     }).catch(error => {});
                                                // }).catch(error => {});
                                            }).catch(error => {})
                                        }
                                    }).catch(error => {
                                            console.log(error,"===========================")
                                    })


                                    // wss.clients.forEach(function each(client) {
                                    //     console.log(client);
                                    //     // client.send(JSON.stringify(response));
                                    // });
                                });



                                // console.log('Transfer to ', formatAddress(trxData.topics['1']), ' - ', transferAmount, ' credits.');

                            }
                        }
                    })
                })
            }

            // console.log("Contract " + trxData.address + " has transaction of " + web3.utils.fromWei(web3.utils.hexToNumberString(trxData.data), 'ether') + " from " + formatAddress(trxData.topics['1']) + " to " + formatAddress(trxData.topics['2']));
            // web3.eth.getTransactionReceipt(trxData.transactionHash, function (error, reciept) {
            //     if (reciept)
            //         console.log('Sent by ' + reciept.from + ' to contract ' + reciept.to);
            // });
        });
    } catch (error) {
        console.error("ERROR: ", error);
        console.log("Restarting track");
        trackBlockchain();
    }
}

const Ethereum = {
    trackBlockchain
};

export {
    Ethereum
};