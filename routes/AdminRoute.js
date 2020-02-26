import express from 'express';

import {
	Register as registerController,
    Login as loginController,
    Admin as adminController
} from './../controllers';
import {
   Token
} from './../middleware';
var router = express.Router();
router.get('/', function (req, res, next) {
	res.status(200);
	res.send({
		status: 'running',
		message: 'Welcome to  api'
	});
});

router.route('/partners').get(Token, function (req, res, next) {
    adminController.getAll(req)
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
 router.get('/cron',function(req,res,next){
	 adminController.transcations().then((response)=>{

	 });
 })
module.exports = router;
