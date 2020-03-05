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
const getAll = (req) =>{
    let defer = q.defer();
    let body = req.body;
    food_types.findAll({where:{
        active:1
    }}).then(fooddata=>{
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

const FoodTypes = {
    get,
    getAll
};

export {
    FoodTypes
};