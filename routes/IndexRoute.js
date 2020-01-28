import express from 'express';

import {
	Register as registerController,
	Login as loginController
} from './../controllers';

var router = express.Router();
router.get('/', function (req, res, next) {
	res.status(200);
	res.send({
		status: 'running',
		message: 'Welcome to Partner Rubique api'
	});
});

router.post('/register', function (req, res, next) {
    registerController.post(req.body)
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
router.post('/login',function(req,res,next){
	loginController.post(req.body).then((response)=>{
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
