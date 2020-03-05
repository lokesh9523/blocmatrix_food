import {
    sequelize,
    logins,
    users_data,
    users_roles,
    role
} from './../models';
import * as jwt from 'jsonwebtoken';
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
    if (!data.mobile_number) {
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
    logins.hasOne(users_data, { foreignKey: 'login_id', targetKey: 'id' });
    users_data.belongsTo(logins, { foreignKey: 'login_id', targetKey: 'id' });

    logins.hasOne(users_roles,{ foreignKey:'login_id',targetKey:'id' });
    users_roles.belongsTo(logins, { foreignKey: 'login_id', targetKey: 'id' });

    role.hasMany(users_roles, { foreignKey: 'role_id' })
	users_roles.belongsTo(role, { foreignKey: 'role_id' });
    logins.findOne({
            where: {
                password: md5Password,
                mobile_number: data.mobile_number
            },include: [
                {
                    model: users_data
                },{ model: users_roles, include: [{ model: role }] }]
        })
        .then(logindata=> {
            if (logindata) {
                let token = jwt.sign({data:logindata},'blocmatrix');
                logindata.dataValues.token = token;
                // console.log(logindata);
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