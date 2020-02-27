import {
    sequelize,
    login,
    partner_details,
    partner_roles,
    roles,
    ether_transcations
} from './../../models';
import * as jwt from 'jsonwebtoken';
import q from 'q';
import {
    wss
} from '../../bin/www';
import {
    Partner
} from './Partner';

var md5 = require('md5');

const request = require('request');

const yamlConfig = require('yaml-config');

const config = yamlConfig.readConfig('config.yml');

setInterval(function () {

    ether_transcations.findAll({
        where: {
            status: 'Pending'
        }
    }).then(pendingtransactions => {
        if (pendingtransactions && pendingtransactions.length) {
            pendingtransactions.forEach(element => {
                var url = 'https://' +
                    config.httpAPI.url +
                    '/api?module=transaction&action=gettxreceiptstatus&txhash=' +
                    element.transcation_hash +
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
                    console.log(body, "-------------------------------body")
                    var status = "Pending";
                    if (body.result.status === "1" || body.result.status === "0") {
                        if (body.result.status === "1") {
                            status = "Success";
                        }
                        if (body.result.status === "0") {
                            status = "Error";
                        }
                        var data = {};
                        data.status = status;
                        ether_transcations.update(data, {
                            where: {
                                transcation_hash: element.transcation_hash
                            }
                        }).then(updatependingtranscation => {
                            partner_details.findOne({
                                where: {
                                    login_id: element.login_id
                                },
                                raw: true
                            }).then(partnerdetails => {
                                var credits = element.value * config.TokenValue;
                                console.log('Added credits ----------------', credits);
                                var creditsdata = {};
                                var totalCredits  = partnerdetails.amount + credits;
                                creditsdata.amount =totalCredits;
                                partner_details.update(creditsdata, {
                                    where: {
                                        login_id: element.login_id
                                    }
                                }).then(creditsdata => {                                    
                                    console.log("data Updated!!!!!!!!!!!!!!!!!!!")
                                    var wsData = {
                                        login_id: element.login_id,
                                        addedCredits: credits,
                                        totalCredits: totalCredits,
                                        method: 'CreditsUpdate'
                                    };
                                    console.log(wsData,"=======================wsData")
                                    wss.clients.forEach(function each(client) {
                                        client.send(JSON.stringify(wsData));
                                    });
                                })
                            })
                        })
                    }

                })
            });
        }
    })

}, config.TimeInterval);
const get = (data) => {
    let defer = q.defer();
    defer.resolve({
        "message": "done"
    });
    return defer.promise;
}
const getAll = (req) => {
    let defer = q.defer();
    let tokendata = req.tokendata;
    if (tokendata.data.partner_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }
    login.hasOne(partner_details, {
        foreignKey: 'login_id',
        targetKey: 'id'
    });
    partner_details.belongsTo(login, {
        foreignKey: 'login_id',
        targetKey: 'id'
    });

    login.hasOne(partner_roles, {
        foreignKey: 'login_id',
        targetKey: 'id'
    });
    partner_roles.belongsTo(login, {
        foreignKey: 'login_id',
        targetKey: 'id'
    });
    login.findAll({

            include: [{
                model: partner_details
            }, {
                where: {
                    role_id: 2
                },
                model: partner_roles
            }]
        })
        .then(logindata => {
            defer.resolve(logindata)
        }).catch(error => {
            defer.reject({
                status: 400,
                message: error.message
            });
            return defer.promise;
        });
    return defer.promise;
}
const post = (data) => {
    let defer = q.defer();

    return defer.promise;
}
const transcations = () => {
    const request = require('request');
    setInterval(function () {
        console.log('second passed');
    }, 1000);
    //     var cron = require('node-cron');

    // cron.schedule('1 * * * *', () => {
    //   console.log('running a task every minute');
    // });
    // var job = new CronJob('1 * * * * *', function() {
    //   console.log('You will see this message every minute');
    //   request({
    //     url: config.api,
    //     method: 'GET',
    //     headers: {
    //         "content-type": "application/json"
    //     }
    // }, function (error, response, body) {
    //     //console.log(JSON.parse(body))
    //     console.log("API Response ", response);
    //     console.log("API Error ", error);
    // });
    // }, null, true, 'America/Los_Angeles');
    // job.start();
}

const Admin = {
    get,
    post,
    getAll,
    transcations
};

export {
    Admin
};