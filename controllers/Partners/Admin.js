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
// setInterval(function () {
//     const request = require('request');
//     console.log('second passedddddddddddddddddddddddd');
//     var config = require(__dirname + '/../../config/ether.json');
//     request({
//         url: config.api,
//         method: 'GET',
//         headers: {
//             "content-type": "application/json"
//         }
//     }, function (error, response, body) {
//         // wss.clients.forEach(function each(client) {
//         //     console.log(client);
//         //     // client.send(JSON.stringify(response));
//         // });

//         let etherdata = JSON.parse(body);
//         let wsdata = [];
//         partner_details.findAll({
//             where: {
//                 ether_account: {
//                     $ne: null
//                 }
//             }
//         }).then(partnerdata => {
//             partnerdata.forEach((partner, index) => {
//                 if (partner.ether_account) {
//                     var obj = etherdata.result.filter(e => e.from.toUpperCase() == partner.ether_account.toUpperCase());
//                     // console.log(obj,'====================');
//                     if (obj.length) {
//                         etherdata.result.forEach(element => {
//                             var data = {};
//                             data.login_id = partner.login_id;
//                             data.time_stamp = element.timeStamp;
//                             data.from_address = element.from;
//                             data.to_address = element.to;
//                             data.block_number = element.blockNumber;
//                             data.token = element.tokenSymbol;
//                             data.value = element.value / 1000000000000000000;
//                             ether_transcations.findOne({
//                                 where: {
//                                     login_id: data.login_id,
//                                     time_stamp: data.time_stamp
//                                 }
//                             }).then(transcations => {
//                                 if (!transcations) {
//                                     ether_transcations.create(data).then(transcations_data => {
//                                         var credits = {};
//                                         wsdata.push(transcations_data.dataValues);
//                                         credits.amount = data.value * 1000;
//                                         partner_details.update(credits, {
//                                             where: {
//                                                 login_id: partner.login_id
//                                             }
//                                         }).then(creditsdata => {
//                                             if (partnerdata.length == (index + 1)) {
//                                                 wss.clients.forEach(function each(client) {
//                                                      client.send(JSON.stringify(wsdata));
//                                                 });
//                                             }
//                                         }).catch(error => {});
//                                     }).catch(error => {})
//                                 }
//                             }).catch(error => {})
//                         });

//                     }

//                 }
//             })
//         }).catch(error => {});
//         // if(etherdata.result.length){
//         //     etherdata.result.forEach(element => {
//         //         var data  = {};
//         //         data.timestamp = element.timeStamp;
//         //         data.from_address = element.from;
//         //         data.to_address = element.to;
//         //         data.block_number = element.blockNumber;
//         //         data.token = element.tokenSymbole;
//         //         data.value = element.value;
//         //         console.log(data,"====================");
//         //     });
//         //}
//         //console.log(JSON.parse(body))
//         // console.log("API Response ", response);
//         // console.log("API Error ", error);
//     });
// }, 60000);
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