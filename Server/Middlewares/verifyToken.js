const jwt = require("jsonwebtoken");


exports.authantication = async(req,res,next)=>{
    try {
        const {token} = req.headers;
        if(!token){
            res.status(200).json({status:"Fail",message:"unauthorize"});
        }

        const verifyToken = jwt.verify(token,process.env.KEY);
        
        const expireToken = Date.now()/1000 > verifyToken.exp;
        
        if(expireToken){
            res.status(200).json({status:"Fail",message:"expire Your Token"});
        }

        req.userId = verifyToken.id;
        req.userEmail = verifyToken.email
        next();

    } catch (err) {
        res.status(200).json({status:"Fail",message:"something went worng."});
    }
};