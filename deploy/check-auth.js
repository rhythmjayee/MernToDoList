// const HttpError = require("./models/HttpError");

const jwt =require("jsonwebtoken");
const HttpError=require("./models/HttpError");
module.exports=(req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    }
    // console.log(req.headers.authorization)

    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
           throw new Error("Authenication failed");

        }
       const decodedToken= jwt.verify(token,"Secret_Key");
       req.userData={userId:decodedToken.userId};
       next();

    }catch(err){
        return next(new HttpError("Authenication failed",401))

    }
    
}