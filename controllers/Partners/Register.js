import {
	sequelize,
	login
} from './../../models';
var md5 = require('md5');
import q from 'q';

const get = (data) => {
	let defer = q.defer();
	defer.resolve({
        "message" : "done"
    });
	return defer.promise;
}
const post = (data) =>{
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
	if (!data.name) {
		defer.reject({
			status: 403,
			message: "Name is missing"
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
	data.password = md5(data.password);
	login.create(data).then(logindata=>{
		if(logindata){
			defer.resolve(logindata)
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

const Register = {
	get,
	post
};

export {
	Register
};
