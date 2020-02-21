import express from 'express';

import {
	Register as registerController,
	Login as loginController,
	Partner as partnerController,
} from './../controllers';
import {
    upload,Token
} from './../middleware';
var router = express.Router();


router.route('/:login_id').put(Token, function (req, res, next) {
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

router.route('/:login_id').post(Token,upload.any(),function(req, res, next){
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

router.route('/:login_id').get(Token,function(req,res,next){
	partnerController.get(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})

router.route('/:login_id/partner_details').get(Token,function(req,res,next){
	partnerController.getPartnerDetails(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})

router.route('/:login_id/data/:partner_id').delete(Token,function(req,res,next){
	partnerController.Delete(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})
router.route('/:login_id/data/:id').put(Token,function(req,res,next){
	partnerController.updatePartnerData(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})
router.route('/:login_id/ether').put(Token,function(req,res,next){
	partnerController.checkEther(req).then((response)=>{
		res.status(200);
		res.send({
			data:response
		});
	}).catch(err =>{
		next(err);
	})
})

module.exports = router;
