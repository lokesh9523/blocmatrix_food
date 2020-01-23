import express from 'express';

import {
	Register as registerController
} from './../controllers';

var router = express.Router();
router.get('/', function (req, res, next) {
	res.status(200);
	res.send({
		status: 'running',
		message: 'Welcome to Partner Rubique api'
	});
});

router.get('/register', function (req, res, next) {
    registerController.get()
	.then((response) => {
        res.status(200);
		res.send({
            message: response
        });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
});

module.exports = router;
