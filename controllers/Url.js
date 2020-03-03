import {
    sequelize,
    ether_transcations,
    url

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
    url.findAll({
        where: {
            status: 1
        }
    }).then(Urls => {
        defer.resolve(Urls);
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
    
    url.create(body).then(Urls => {
        defer.resolve(Urls);
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

    if (!params.url_id) {
        defer.reject({
            status: 403,
            message: "ID is missing"
        });
        return defer.promise;
    }
    url.update(body, {
        where: {
            id: params.url_id
        }
    }).then(urldata => {
        if (urldata) {
            url.findOne({
                where: {
                    id: params.url_id
                }
            }).then(urldataupdated => {
                defer.resolve(urldataupdated)
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
    url.findOne({
        where: {
            id:body.url_id
        }
    }).then(Urls => {
        defer.resolve(Urls);
    }).catch(error => {
        defer.reject({
            status: 400,
            message: error.message
        });
        return defer.promise;
    });
    return defer.promise;
}



const Urls = {
    post,
    getAll,
    put,
    get
};

export {
    Urls
};