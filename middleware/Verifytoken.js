
import * as jwt from 'jsonwebtoken';

let token = (req,res,next)=>{
    let token = req.headers['authorization'];
    // console.log(token,"============");
	if (!token){
		return next(new Error("This Api Requires token"));
    }
    let tokendata =  jwt.verify(req.headers['authorization'].toString(), 'blocmatrix')
    if(tokendata){
        req.tokendata = tokendata;
        // console.log(tokendata);
        return next();
    }else{
        return next(new Error("token has expired"));
    }
}

export{
    token
}