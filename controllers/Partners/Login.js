import {
    sequelize,
    login,
    partner_details
} from './../../models';

import q from 'q';
var md5 = require('md5');
const get = (data) => {
    let defer = q.defer();
    defer.resolve({
        "message": "done"
    });
    return defer.promise;
}
const post = (data) => {
    let defer = q.defer();
    if (!data.username) {
        defer.reject({
            status: 403,
            message: "Username is missing"
        });
        return defer.promise;
    }
    if (!data.password) {
        defer.reject({
            status: 403,
            message: "Password is missing"
        });
        return defer.promise;
    }
    let md5Password = md5(data.password);
    login.hasOne(partner_details, { foreignKey: 'login_id', targetKey: 'id' });
	partner_details.belongsTo(login, { foreignKey: 'login_id', targetKey: 'id' });
    login.findOne({
            where: {
                password: md5Password,
                username: data.username
            },include: [
                {
                    model: partner_details
                }]
        })
        .then(function (logindata) {
            if (logindata) {
                defer.resolve(logindata)
            } else {
                defer.reject({
                    status: 400,
                    message: "Username or Password incorrect"
                });
                return defer.promise;
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

const Login = {
    get,
    post
};

export {
    Login
};