import {
    sequelize,
    domains,
    ether_transcations

} from './../models';
import q from 'q';


const getAll = (req) => {
    let defer = q.defer();
    let tokendata = req.tokendata;
    if (tokendata.data.partner_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }
    domains.findAll({
        where: {
            status: 1
        }
    }).then(domains => {
        defer.resolve(domains);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}
const post = (req) => {
    let defer = q.defer();
    let body = req.body;
    let tokendata = req.tokendata;
    if (tokendata.data.partner_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }
    if (!body.url) {
        defer.reject({
            status: 403,
            message: "Url is missing"
        });
        return defer.promise;
    }
    if (!body.domain_name) {
        defer.reject({
            status: 403,
            message: "Domain Name is missing"
        });
        return defer.promise;
    }
    domains.create(body).then(domains => {
        defer.resolve(domains);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}
const put = (req) => {
    let defer = q.defer();
    let body = req.body;
    let params = req.params;
    let tokendata = req.tokendata;
    if (tokendata.data.partner_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }

    if (!params.domain_id) {
        defer.reject({
            status: 403,
            message: "ID is missing"
        });
        return defer.promise;
    }
    domains.update(body, {
        where: {
            id: params.domain_id
        }
    }).then(domaindata => {
        if (domaindata) {
            domains.findOne({
                where: {
                    id: params.domain_id
                }
            }).then(domaindataupdated => {
                defer.resolve(domaindataupdated)
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
const get = (req) => {
    let defer = q.defer();
    let tokendata = req.tokendata;
    let body = req.params;
    if (tokendata.data.partner_role.role.name != "admin") {
        defer.reject({
            status: 403,
            message: "You are not authorized to view this data"
        });
        return defer.promise;
    }
    domains.findOne({
        where: {
            id:body.domain_id
        }
    }).then(domains => {
        defer.resolve(domains);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}

// const getAllTranscations = (req) => {
//     let defer = q.defer();
//     let tokendata = req.tokendata;
//     if (tokendata.data.partner_role.role.name != "admin") {
//         defer.reject({
//             status: 403,
//             message: "You are not authorized to view this data"
//         });
//         return defer.promise;
//     }
//     ether_transcations.findAll().then(ethertranscations => {
//         defer.resolve(ethertranscations);
//     }).catch(error => {
//         defer.reject({
//             status: 400,
//             message: error.message
//         });
//         return defer.promise;
//     });
//     return defer.promise;
// }

const Domains = {
    post,
    getAll,
    put,
    get
};

export {
    Domains
};