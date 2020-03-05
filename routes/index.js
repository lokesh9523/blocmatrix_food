'use strict';
import path from 'path';
import IndexRoute from './IndexRoute';
import FoodRoute from './FoodRoute';
// import AdminRoute from './AdminRoute';
import {
	Router
} from 'express';

let router = Router();

/* Main Routes. */

module.exports = function (app) {
	router.use('/', IndexRoute);
	router.use('/food',FoodRoute);
	// router.use('/admin',AdminRoute);
	// router.use('/domain',DomainRoute);
	return router;
}
