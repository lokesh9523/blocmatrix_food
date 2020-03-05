import {
    sequelize,
    logins,
    users_data,
    users_roles,
    roles
} from './../models';
import * as jwt from 'jsonwebtoken';
import q from 'q';
var md5 = require('md5');

const post = (data) => {
    let defer = q.defer();
    if (!data.mobile_number) {
        defer.reject({
            status: 403,
            message: "Mobile Number is missing"
        });
        return defer.promise;
    }
    if (!data.name) {
        defer.reject({
            status: 403,
            message: "Name is missing"
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
    console.log(data.mobile_number.toString().length, typeof data.mobile_number)
    if (data.mobile_number.toString().length != 10) {
        defer.reject({
            status: 403,
            message: "Enter Valid Mobile Number"
        });
        return defer.promise;
    }
    if (!data.email) {
        defer.reject({
            status: 403,
            message: "Email is missing"
        });
        return defer.promise;
    }
    if(!data.role_id){
        defer.reject({
            status: 403,
            message: "Role id is missing"
        });
        return defer.promise;
    }
   
    logins.findOne({
        where: {
            $or: [{
                    mobile_number: {
                        $eq: data.mobile_number
                    }
                },
                {
                    email: {
                        $eq: data.email
                    }
                },

            ]
        }
    }).then(logindata => {
        if (logindata) {
            defer.reject({
                status: 403,
                message: "Email or Mobile Number already exits"
            });
            return defer.promise;
        } else {
            data.password = md5(data.password);
            logins.create(data).then(logincreatedata => {
                data.login_id = logincreatedata.id;
                users_data.create(data).then(userdata => {
                    users_roles.create(data).then(user_role => {
                        defer.resolve(logincreatedata)
                    }).catch(error => {
                        defer.reject({
                            status: 400,
                            message: error.message
                        });
                        return defer.promise;
                    });
                }).catch(error => {
                    defer.reject({
                        status: 400,
                        message: error.message
                    });
                    return defer.promise;
                });
            }).catch(error => {
                defer.reject({
                    status: 400,
                    message: error.message
                });
                return defer.promise;
            });
        }
    })
    return defer.promise;
}

const Register = {
    post
};

export {
    Register
};