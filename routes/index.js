'use strict';
import path from 'path';
import IndexRoute from './IndexRoute';
import PartnerRoute from './PartnerRoute';
import AdminRoute from './AdminRoute';
import DomainRoute from './Domain';
import UrlRoute from './Urls';
import {
	Router
} from 'express';

let router = Router();

/* Main Routes. */

module.exports = function (app) {
	router.use('/', IndexRoute);
	router.use('/partner', PartnerRoute);
	router.use('/admin',AdminRoute);
	router.use('/domain',DomainRoute);
	router.use('/url',UrlRoute);
	return router;
}
