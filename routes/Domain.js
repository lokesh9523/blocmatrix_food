import express from 'express';

import {
	Domains as domaincontroller
} from './../controllers';
import {
   Token
} from './../middleware';
var router = express.Router();



router.route('/').get(Token, function (req, res, next) {
    domaincontroller.getAll(req)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});
router.route('/:domain_id').get(Token, function (req, res, next) {
    domaincontroller.get(req)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});

router.route('/').post(Token, function (req, res, next) {
    domaincontroller.post(req)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});

router.route('/:domain_id').put(Token, function (req, res, next) {
    domaincontroller.put(req)
	.then((response) => {
        res.status(200);
		res.send({
            data: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});

module.exports = router;
