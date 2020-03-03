import express from 'express';

import {
	Urls as urlcontroller
} from './../controllers';
import {
   Token
} from './../middleware';
var router = express.Router();



router.route('/').get(Token, function (req, res, next) {
    urlcontroller.getAll(req)
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
router.route('/:url_id').get(Token, function (req, res, next) {
    urlcontroller.get(req)
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
    urlcontroller.post(req)
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

router.route('/:url_id').put(Token, function (req, res, next) {
    urlcontroller.put(req)
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
