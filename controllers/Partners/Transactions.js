import {
    sequelize,
    
    ether_transcations

} from './../../models';
import q from 'q';



const getAllTranscations = (req) => {
    let defer = q.defer();
    let tokendata = req.tokendata;
    if (tokendata.data.partner_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }
    ether_transcations.findAll().then(ethertranscations => {
        defer.resolve(ethertranscations);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}
const Transaction = {

    getAllTranscations
};

export {
    Transaction
};