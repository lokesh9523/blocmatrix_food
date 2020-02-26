import {
    sequelize,
    login,
    partner_details,
    partner_data_list
} from './../../models';

import q from 'q';

import xlsx from 'node-xlsx';
var md5 = require('md5');

const put = (req) => {
    let defer = q.defer();
    let data = req.body;
    let tokendata = req.tokendata;
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id is missing"
        });
        return defer.promise;
    }
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    partner_details.update(data, {
        where: {
            login_id: data.login_id
        }
    }).then(partnerdata => {
        if (partnerdata) {
            partner_details.findOne({
                where: {
                    login_id: data.login_id
                }
            }).then(partnerdetailsdata => {
                defer.resolve(partnerdetailsdata)
            }).catch(error => {
                defer.reject({
                    status: 400,
                    message: error.message
                });
                return defer.promise;
            });
        }
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}

const get = (req) => {
    let defer = q.defer();
    let data = req.params;
    let tokendata = req.tokendata;
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id is missing"
        });
        return defer.promise;
    }
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    partner_data_list.findAll({
        where: {
            login_id: data.login_id,
            active: 1
        },
        order: [
            ['id', 'DESC']
        ]
    }).then(datalist => {
        defer.resolve(datalist);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}
const post = (req, file) => {
    let defer = q.defer();
    let promises = [];
    let data = req.params;
    let tokendata = req.tokendata;
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id missing"
        });
        return defer.promise;
    }
    var fs = require('fs');
    var duplicate = "duplicate";
    var dir = duplicate.concat('/partner_'+req.params.login_id);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
        fs.copyFile(file[0].path,'duplicate/partner_'+ data.login_id +'/'+ file[0].originalname,(err)=>{
            if(err){console.log(err)}
        })

    const readline = require('readline');

    var file1 = file[0].path;
    var linesCount = 0;
    var r = readline.createInterface({
        input: fs.createReadStream(file1),
        output: process.stdout,
        terminal: false
    });
    r.on('line', function (line) {if(line){
        linesCount++;
    } 
    });
    r.on('close', function () {
        console.log(linesCount); 
        let body = {
            "login_id": data.login_id,
            "url": file[0].path,
            "name": file[0].originalname,
            "email_count": linesCount,
            "status": 0

        };
        partner_data_list.create(body).then(datalist => {
            defer.resolve(datalist);
        }).catch(error => {
            defer.reject({
                status: 400,
                message: error.message
            });
            return defer.promise;
        })
    });



    return defer.promise;

}
const Delete = (req) => {
    let defer = q.defer();
    let data = req.params;
    let tokendata = req.tokendata;
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    if (!data.partner_id) {
        defer.reject({
            status: 403,
            message: "Id is  missing"
        });
        return defer.promise;
    }
    let updatedata = {
        "active": 0
    }
    partner_data_list.update(updatedata, {
        where: {
            id: data.partner_id
        }
    }).then(updateddata => {
        defer.resolve(updateddata);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;
}
const getPartnerDetails = (req) => {
    let defer = q.defer();
    let data = req.params;
    let tokendata = req.tokendata;
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id is missing"
        });
        return defer.promise;
    }
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    login.hasOne(partner_details, {
        foreignKey: 'login_id',
        targetKey: 'id'
    });
    partner_details.belongsTo(login, {
        foreignKey: 'login_id',
        targetKey: 'id'
    });
    login.findOne({
            where: {
                id: data.login_id
            },
            include: [{
                model: partner_details
            }]
        })
        .then(logindata=> {
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
const updatePartnerData = (req) => {
    let defer = q.defer();
    let data = req.params;
    let body = req.body;
    let tokendata = req.tokendata;
    if (!data.id) {
        defer.reject({
            status: 403,
            message: "Id is  missing"
        });
        return defer.promise;
    }
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    partner_data_list.update(body, {
        where: {
            id: data.id
        }
    }).then(updateddata => {
        defer.resolve(updateddata);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;
}
const checkEther = (req)=>{
    let defer = q.defer();
    let data = req.params;
    let body = req.body;
    let tokendata = req.tokendata;
         const request = require('request');
        var config = require(__dirname + '/../../config/ether.json');
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Id is  missing"
        });
        return defer.promise;
    }
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    let promises = [];
    partner_details.findOne({
        where: {
            login_id: data.login_id
        }
    }).then(partnerdetailsdata => {
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    promises.push( 
        request({
            url: config.api,
            method: 'GET',
            headers: {
                "content-type": "application/json"
            }
        
                // transcationdata.result.forEach(element => {
                //     console.log(element.from.toUpperCase(),"================",typeof element.from);
                //     console.log(partnerdetailsdata.ether_account.toUpperCase(),"========",typeof partnerdetailsdata.ether_account);
                //     if(element.from.toUpperCase() === partnerdetailsdata.ether_account.toUpperCase()){
                //         console.log("iam here");
                //     }
                // });
            // defer.resolve(JSON.parse(body));
    
            // console.log(response.result)
            // console.log(body,"=================");
            // //console.log(JSON.parse(body))
            //  console.log("API Response ", response);
            // // console.log("API Error ", error);
        }).then(requestdata=>{
            return requestdata;
        })

    )
    // promises.push(
    //     request({
    //             url: config.api,
    //             method: 'GET',
    //             headers: {
    //                 "content-type": "application/json"
    //             }
    //         }, function (error, response, body) {
    //             // let transcationdata = JSON.parse(body);
    //             //     transcationdata.result.forEach(element => {
    //             //         console.log(element.from.toUpperCase(),"================",typeof element.from);
    //             //         console.log(partnerdetailsdata.ether_account.toUpperCase(),"========",typeof partnerdetailsdata.ether_account);
    //             //         if(element.from.toUpperCase() === partnerdetailsdata.ether_account.toUpperCase()){
    //             //             console.log("iam here");
    //             //         }
    //             //     });
    //             // defer.resolve(JSON.parse(body));
        
    //             // console.log(response.result)
    //             // console.log(body,"=================");
    //             // //console.log(JSON.parse(body))
    //             //  console.log("API Response ", response);
    //             // // console.log("API Error ", error);
    //         })
    // )
    Promise.all(promises).then(data=>{
        defer.resolve(data);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;
}
const addPartnerEtheraccount = (req)=>{
    let defer = q.defer();
    let data = req.params;
    let body = req.body;
    let tokendata = req.tokendata;
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Id is  missing"
        });
        return defer.promise;
    }
    if(tokendata.data.partner_role.role.name == "admin"){

    }else{

        if(tokendata.data.id != data.login_id){
            defer.reject({
                status: 403,
                message: "User Id mismatch"
            });
            return defer.promise;
        }
    }
    partner_details.findOne({where:{
        ether_account:body.ether_account
    }}).then(partnerdata=>{
        if(!partnerdata){
            let updatedata = {};
            updatedata.ether_account = body.ether_account
            partner_details.update(updatedata, {
                where: {
                    login_id: body.login_id
                }
            }).then(updateddata => {
                defer.resolve(updateddata);
            }).catch(error => {
                defer.reject({
                    status: 400,
                    message: error.message
                });
                return defer.promise;
            })
        }else{
            defer.reject({
                status: 403,
                message: "This address is already exists"
            });
            return defer.promise;
        }
    })
   
    return defer.promise;
}
const Partner = {
    put,
    get,
    post,
    Delete,
    getPartnerDetails,
    updatePartnerData,
    checkEther,
    addPartnerEtheraccount
};

export {
    Partner
};