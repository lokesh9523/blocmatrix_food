import {
	sequelize,
	login,
	partner_details,
	roles,
    partner_roles,
    partner_request
	
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
const post = (req) => {
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
    
    return defer.promise;
}

const Cleanemail = {
	get,
	post
};

export {
	Cleanemail
};