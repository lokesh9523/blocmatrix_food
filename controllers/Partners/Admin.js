import {
    sequelize,
    login,
    partner_details,
    partner_roles,
    roles
} from './../../models';
import * as jwt from 'jsonwebtoken';
import q from 'q';
var md5 = require('md5');
	setInterval(function () { 
	// 	const request = require('request');
    // 	console.log('second passedddddddddddddddddddddddd'); 
    
// var config = require(__dirname + '/../../config/ether.json');
	// 	   request({
    //     url: config.api,
    //     method: 'GET',
    //     headers: {
    //         "content-type": "application/json"
    //     }
    // }, function (error, response, body) {
    //     console.log(body,"=================");
    //     //console.log(JSON.parse(body))
    //      console.log("API Response ", response);
    //     // console.log("API Error ", error);
    // });
	}, 5000);
const get = (data) => {
    let defer = q.defer();
    defer.resolve({
        "message": "done"
    });
    return defer.promise;
}
const getAll = (req)=>{
    let defer = q.defer();
    let tokendata = req.tokendata;
    if(tokendata.data.partner_role.role.name != "admin"){
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }
    login.hasOne(partner_details, { foreignKey: 'login_id', targetKey: 'id' });
    partner_details.belongsTo(login, { foreignKey: 'login_id', targetKey: 'id' });
    
    login.hasOne(partner_roles,{ foreignKey:'login_id',targetKey:'id' });
    partner_roles.belongsTo(login, { foreignKey: 'login_id', targetKey: 'id' });
    login.findAll({
       
        include: [{
            model: partner_details
        },{ where:{role_id:2},model: partner_roles}]
    })
    .then(function (logindata) {
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
const transcations =()=> {
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