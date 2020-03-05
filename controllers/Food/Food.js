import {
    sequelize,
    food,
    food_types
} from './../../models';
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
const post = (req) => {
    let defer = q.defer();
    let body = req.body;
    let tokendata = req.tokendata;
    if (!body.display_name) {
        defer.reject({
            status: 403,
            message: "Display Name is missing"
        });
        return defer.promise;
    }
    if (tokendata.data.users_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized person"
        });
        return defer.promise;
    }
    body.name = body.display_name.split(' ').join('_').toLowerCase();
    food.findOne({
		where: {
			name: body.name
		},
	}).then(fooddata => {
		if (fooddata) {
			defer.reject({
	            status: 400,
	            message: "Food already exists"
	        });
			return defer.promise;
		}
		else {
            food.create(body).then(foodResponse => {
                defer.resolve(foodResponse)

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
const getAll = (req) =>{
    let defer = q.defer();
    let body = req.body;

    food_types.hasMany(food, { foreignKey: 'food_type_id',  });
    food.belongsTo(food_types, { foreignKey: 'food_type_id',  });

    food_types.findAll({include:[
        {
            model:food,where:{active:1},required:false
        }
    ]}).then(fooddata=>{
        defer.resolve(fooddata);
    }).catch(error=>{
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    })
    return defer.promise;
}
const del = (req)=>{
    let defer = q.defer();
    let body = req.params;
    let tokendata = req.tokendata;
    if (!body.food_id) {
        defer.reject({
            status: 403,
            message: "Id is missing"
        });
        return defer.promise;
    }
    if (tokendata.data.users_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized person"
        });
        return defer.promise;
    }
    food.update({active:0},{
        where: { id: body.id }
    }).then(foodResponse => {
        food.findOne({
            where: {
                id: body.id
            },
        })
            .then(foodData => {
                defer.resolve(foodData);
            })
            .catch(error => {
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
    return defer.promise;
}
const Food = {
    get,
    post,
    getAll,
    del
};

export {
    Food
};