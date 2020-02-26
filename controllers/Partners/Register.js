import {
	sequelize,
	login,
	partner_details,
	roles,
	partner_roles
	
} from './../../models';
var md5 = require('md5');
import q from 'q';

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

	if (!data.email) {
		defer.reject({
			status: 403,
			message: "Email is missing"
		});
		return defer.promise;
	}
	data.password = md5(data.password);
	login.findOne({
		where: {
			username:data.username

		},
	}).then(registereddata => {
		if (registereddata) {
			defer.reject({
				status: 403,
				message: "Username  already registered"
			});
			return defer.promise;
		} else {
			login.create(data).then(logindata => {
				if (logindata) {
					let partnerdata = {
						"login_id": logindata.id,
						"amount": 0
					}
					partner_details.create(partnerdata).then(partnerdata => {
							if(partnerdata){
								let role = {
									"login_id":logindata.id,
									"role_id":2
								}
								partner_roles.create(role)
							}
					}).catch(error => {
						defer.reject({
							status: 400,
							message: error.message
						});
						return defer.promise;
					});
					defer.resolve(logindata)
				}
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

const Register = {
	get,
	post
};

export {
	Register
};