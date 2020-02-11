import express from 'express';

import {
	Register as registerController,
	Login as loginController,
	Partner as partnerController,
} from './../controllers';
import {
    upload
} from './../middleware';
var router = express.Router();


router.put('/:login_id', function (req, res, next) {
    partnerController.put(req.body)
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

router.route('/:login_id').post( upload.any(),function(req, res, next){
	const files = req.files
   if (!files) {
	 const err = new Error('Please upload the files');
	 err.httpStatusCode = 400
	 return next(err)
   }
   partnerController.post(req,files).then((response) => {
	   res.status(200);
	   res.send({
		   data: response
	   });
   }).catch(err => {
	   next(err);
   })
})

router.route('/:login_id').get(function(req,res,next){
	partnerController.get(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})

router.route('/:login_id/partner_details').get(function(req,res,next){
	partnerController.getPartnerDetails(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})

router.route('/:login_id/data/:partner_id').delete(function(req,res,next){
	partnerController.Delete(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})
module.exports = router;
