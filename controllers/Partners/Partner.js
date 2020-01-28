import {
    sequelize,
    login,
    partner_details,
    partner_data_list
} from './../../models';

import q from 'q';
var md5 = require('md5');

const put = (data) => {
    let defer = q.defer();
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id is missing"
        });
        return defer.promise;
    }
   partner_details.update(data,{
       where:{
           login_id:data.login_id
       }
   }).then(partnerdata=>{
    if(partnerdata){
        partner_details.findOne({where:{
            login_id:data.login_id}
        }).then(partnerdetailsdata=>{
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

const get = (req) =>{
    let defer = q.defer();
    let data = req.params;
    if (!data.login_id) {
        defer.reject({
            status: 403,
            message: "Login Id is missing"
        });
        return defer.promise;
    }
    partner_data_list.findAll({where:{login_id:data.login_id,
    active:1}}).then(datalist=>{
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
const post = (req,file) =>{
    let defer = q.defer();
    let data = req.params;
    if(!data.login_id){
        defer.reject({
            status:403,
            message:"Login Id missing"
        });
        return defer.promise;
    }
    let body = {
        "login_id":data.login_id,
        "url": file[0].path,
        "name":file[0].originalname,
        "file_size":file[0].size,
        "status":50

    };
    console.log(body);
    partner_data_list.create(body).then(datalist=>{
        defer.resolve(datalist);
    }).catch(error=>{
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;

}
const Delete = (req) =>{
    let defer = q.defer();
    let data = req.params;
    if(!data.partner_id){
        defer.reject({
            status:403,
            message:"Id is  missing"
        });
        return defer.promise;
    }
    let updatedata = {
        "active":0
    }
    partner_data_list.update(updatedata,{
        where:{
            id:data.partner_id
        }
    }).then(updateddata=>{
        defer.resolve(updateddata);
    }).catch(error=>{
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;
}
const Partner = {
    put,
    get,
    post,
    Delete
};

export {
    Partner
};