import express from 'express';
import {
	Food as foodController,
	FoodTypes as typeController
} from './../controllers'
import {
    token
} from './../middleware'

var router = express.Router();
// router.get('/', function (req, res, next) {
// 	res.status(200);
// 	res.send({
// 		status: 'running',
// 		message: 'Welcome to Blocmatrix api'
// 	});
// });

router.route('/').post(token,function(req,res,next){
    foodController.post(req)
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
router.route('/').get(function(req,res,next){
    foodController.getAll(req)
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
router.route('/type').get(function(req,res,next){
    typeController.getAll(req)
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
router.route('/:food_id').delete(function(req,res,next){
    foodController.getAll(req)
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
