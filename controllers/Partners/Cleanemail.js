import {
    sequelize,
    partner_data_list,
    partner_details

} from './../../models';
var md5 = require('md5');
import q from 'q';
import {
    wss
} from '../../bin/www';
const yamlConfig = require('yaml-config');
const config = yamlConfig.readConfig('config.yml');

const get = (data) => {
    let defer = q.defer();
    defer.resolve({
        "message": "done"
    });
    return defer.promise;
}
const post = (req) => {

    let defer = q.defer();
    let data = req.params;
    let tokendata = req.tokendata;
    const readline = require('readline');
    const request = require('requestretry');
    const replace = require('replace-in-file');
    var fs = require('fs');
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id is missing"
        });
        return defer.promise;
    }


    if (tokendata.data.id != data.login_id) {
        defer.reject({
            status: 403,
            message: "User Id mismatch"
        });
        return defer.promise;
    }
    partner_data_list.findOne({
        where: {
            login_id: data.login_id,
            id: data.file_id
        },
        raw: true
    }).then(filedata => {
        // console.log(filedata,"===========================filedata")
        if (filedata) {
            var file = filedata.url;
            var linesCount = 0;

            var r = readline.createInterface({
                input: fs.createReadStream(file),
                output: process.stdout,
                terminal: false
            })
            r.on('line', function (line) {
                if (line) {
                    try{
                   //var sendwebsocket = false;
                    request({
                        url: "http://167.114.165.59/dapi/smtpverifyapi.php?email=" + line,
                        method: 'GET',
                        headers: {
                            "content-type": "application/json"
                        },
                        maxAttempts: 5,   // (default) try 5 times
                        retryDelay: 5000,  // (default) wait for 5s before trying again
                        retryStrategy: request.RetryStrategies.HTTPOrNetworkError
                    }, function (error, response, body) {
                        // console.log(response,"============================response")
                        if(body){
                            // console.log(body,"================================Body");
                             let status = body.split(',');
                            console.log(status[0], "############### Email #################", status[1]);
                            // console.log(status,"##########################status")
                            var sendwebsocket = false;
                        if (status[1] !== 'ok') {
                            const options = {
                                files: filedata.url,
                                from: line,
                                to: '',
                            };
                            replace(options)
                                .then(results => {
                                    console.log('Replacement results:', results);
                                    partner_data_list.findOne({
                                        where: {
                                            id: data.file_id
                                        },
                                        raw: true
                                    }).then(partnerdata => {
                                        var emailupdate = {};
                                        var emailcleanedcount = partnerdata.email_cleaned;
                                        emailupdate.email_cleaned = emailcleanedcount + 1;
                                        emailupdate.status =  (100/partnerdata.email_count) * emailupdate.email_cleaned;
                                        partner_data_list.update(emailupdate, {
                                            where: {
                                                id: data.file_id
                                            }
                                        }).then(updatedemaildate => {
                                            partner_details.findOne({where:{login_id:data.login_id},raw:true}).then(partnerdetails=>{
                                                console.log(partnerdetails,"======================");
                                                var ether_amount = partnerdetails.amount - 1;
                                                console.log(ether_amount,"======================================etheramount")
                                                    partner_details.update({"amount":ether_amount},{where:{login_id:data.login_id},raw:true}).then(updatespartnerdetails=>{
                                                        sendwebsocket = true;
                                                        setInterval(function () {
                                                            console.log("started")
                                                            var wsData = {};
                                                        var wsData = {
                                                            login_id: data.login_id,
                                                            mails_cleand:emailupdate.email_cleaned,
                                                            file_id:data.file_id,
                                                            credits:ether_amount,
                                                            status: Math.ceil(emailupdate.status),
                                                            method: 'Mailcleaning'
                                                        };
                                                        if(sendwebsocket === true){
                                                            console.log("iam here");
                                                        console.log(wsData,"=================wsData")
                                                            wss.clients.forEach(function each(client) {
                                                                client.send(JSON.stringify(wsData));
                                                            });
            
                                                        }
                                                        },10000);
                                                        
                                                    }).catch(error => {
                                                        console.log(error, "===============================error5");
                                                    })
                                            }).catch(error => {
                                                console.log(error, "===============================error4");
                                            })
                                           
                                        }).catch(error => {
                                            console.log(error, "===============================error3");
                                        })
                                    }).catch(error => {
                                        console.log(error, "=============================error2");
                                    });
                                })
                                .catch(error => {
                                    console.log(error, "=============================error1");
                                });
                        }

                    }
                    if(error){
                        // console.log(error.code === 'ETIMEDOUT');
                        // console.log(error,"=============================error")
                        // console.log(line,"=========================email")
                        // console.log("======================error")
                    }


                    })
                } catch(error){
                    next(error);
                }
     
            }
           

            });
            r.on('close', function () {
                partner_data_list.findOne({
                    where: {
                        id: data.file_id,
                        login_id: data.login_id
                    }
                }).then(partnerdatalist => {
                    defer.resolve(partnerdatalist);
                }).catch(error => {
                    defer.reject({
                        status: 400,
                        message: error.message
                    });
                    return defer.promise;
                });
            });
        }
    })
    return defer.promise;
}


const Cleanemail = {
    get,
    post
};

export {
    Cleanemail
};