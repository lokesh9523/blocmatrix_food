'use strict';
import path from 'path';
import IndexRoute from './IndexRoute';
import PartnerRoute from './PartnerRoute';

import {
	Router
} from 'express';

let router = Router();

/* Main Routes. */

module.exports = function (app) {
	router.use('/', IndexRoute);
    router.use('/partner', PartnerRoute);
	return router;
}
