const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../Models/user');
const { log } = require('console');



exports.userRegistration = async(req)=>{
    try {
        const {name,email,password} = req.body;

        if(!name){
            return {status:"Fail",message:"name is require."}
        }else if(name.length < 3){
            return {status:"Fail",message:"min 3 charactar."}
        }
        const existsName = await userModel.findOne({name});
        if(existsName){
            return {status:"Fail",message:"user name alreday use."}
        }
        if(!email){
            return {status:"Fail",message:"email is require."}
        }
        const existsEmail = await userModel.findOne({email});
        if(existsEmail){
            return {status:"Fail",message:"email alreday use."}
        }
        if(!password){
            return {status:"Fail",message:"password is require."}
        }else if(password.length < 8){
            return {status:"Fail",message:"min 8 charactar."}
        }

        const userRegistration = await new userModel({...req.body,photo:{data:path.join(__dirname,"../img/undraw_pic_profile_re_7g2h.svg"),contentType:"image/svg+xml"}}).save();


        const token = jwt.sign({id:userRegistration._id,email:userRegistration.email},process.env.KEY,{expiresIn:"1h"});


        return {status:"success",message:"registration done.",token,data:userRegistration};


    } catch (error) {
        return {status:"Fail",message:"something went wrong."}
    }
};


exports.userLogin = async(req)=>{
    try {
        const {email,password} = req.body;

        if(!email){
            return {status:"Fail",message:"email is require."}
        }
        const existsEmail = await userModel.findOne({email});
        if(!existsEmail){
            return {status:"Fail",message:"user not found."}
        }
        if(!password){
            return {status:"Fail",message:"password is require."}
        }else if(password.length < 8){
            return {status:"Fail",message:"min 8 charactar."}
        }

        const comparePassword = await bcrypt.compare(password,existsEmail.password);
        if(!comparePassword){
            return {status:"Fail",message:"email or password in wrong."};
        }
        
        const token = jwt.sign({id:existsEmail._id,email:existsEmail.email},process.env.KEY,{expiresIn:"1h"});

        return {status:"success",message:"login done.",token,data:existsEmail};

        
    } catch (error) {
        return {status:"Fail",message:"something went wrong."}
    }
};


exports.user_profile_update = async(req)=>{
    try {
        const {name} = req.body;
        const photo = req.file;
        
        if(name){
            if(name.length < 3){
                return {status:"Fail",message:"min 3 charactar."}
            }
        }
        const existsName = await userModel.findOne({name});
        if(existsName){
            return {status:"Fail",message:"user name alreday use."}
        }

        if(photo){
             if(photo.size > 1500000 ){
                    return {status:"Fail",message:"min 1.5mb size supported."}
                }
        };

        const existsUser = await userModel.findOne({_id:req.userId});

        await userModel.findByIdAndUpdate({_id:req.userId},{$set:{name:name.length == 0 ? existsUser.name:name,photo:{data:photo ? photo.buffer : existsUser.photo.data,contentType:photo ? photo.mimetype : existsUser.photo.contentType}}});

        return {status:"success",message:"profile update done."};

    } catch (error) {
        return {status:"Fail",message:"something went wrong.",err:error.message}
    }
};


exports.user_password_update = async(req)=>{
    try {
        const {password,oldPassword} = req.body;

        if(!oldPassword){
            return {status:"Fail",message:"oldPassword is require."}
        }else if(oldPassword.length < 8){
            return {status:"Fail",message:"min 8 charactar."}
        }

        if(!password){
            return {status:"Fail",message:"Password is require."}
            
        }else if(password.length < 8){
            return {status:"Fail",message:"min 8 charactar."}
        }

        const existsUser = await userModel.findOne({_id:req.userId});
        const checkOldPassword = await bcrypt.compare(oldPassword,existsUser.password);
        if(!checkOldPassword){
            return {status:"Fail",message:"wrong old password."}
        }

        await userModel.findByIdAndUpdate({_id:req.userId},{$set:{password}});

        return {status:"success",message:" password update done."};

    } catch (error) {
        return {status:"Fail",message:"something went wrong."}
    }
};


exports.profile_delete = async(req)=>{
    try {
        await userModel.findByIdAndDelete({_id:req.userId});

        return {status:"success",message:" profile delete done."};

    } catch (error) {
        return {status:"Fail",message:"something went wrong."}
    }
};


exports.profile_get = async(req)=>{
    try {
       const singleUserFind = await userModel.findOne({_id:req.userId});

        return {status:"success",data:singleUserFind};

    } catch (error) {
        return {status:"Fail",message:"something went wrong."}
    }
};