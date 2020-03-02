import express from 'express';

import {
	Register as registerController,
    Login as loginController,
	Admin as adminController,
	Transaction as transactionController
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

router.route('/login').post(function(req,res,next){
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
 router.route('/ether/transcations').get(Token,function(req,res,next){
	 transactionController.getAllTranscations(req).then((response)=>{
		res.status(200);
		res.send({
            data: response
        });
	 }).catch(err => {
		console.log(err);
		next(err);
	})
 });

 router.route('/partner/:login_id/history').get(Token,function(req,res,next){
	 adminController.getUserDetailsById(req).then((response)=>{
		res.status(200);
		res.send({
            data: response
        });
	 }).catch(err => {
		console.log(err);
		next(err);
	})
 })
module.exports = router;


// CREATE TABLE `mailjainitar`.`domains` (
// 	`id` INT NOT NULL AUTO_INCREMENT,
// 	`url` VARCHAR(100) NOT NULL,
// 	`domain_name` VARCHAR(100) NOT NULL,
// 	`speed_per_hour` VARCHAR(45) NOT NULL,
// 	`date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
// 	`date_updated` DATETIME NULL,
// 	PRIMARY KEY (`id`));
// ALTER TABLE `mailjainitar`.`domains` 
// ADD COLUMN `status` TINYINT(4) NOT NULL DEFAULT '1' AFTER `speed_per_hour`;
