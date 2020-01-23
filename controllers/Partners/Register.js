import {
	sequelize
} from './../../models';

import q from 'q';

const get = (data) => {
	let defer = q.defer();
	defer.resolve({
        "message" : "done"
    });
	return defer.promise;
}

const Register = {
    get
};

export {
	Register
};
