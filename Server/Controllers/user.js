const { profile_get, profile_delete, user_password_update, user_profile_update, userLogin, userRegistration } = require("../service/user");

exports.registration = async(req,res)=>{
    const result = await userRegistration(req);
    res.status(200).json(result);
};
exports.login = async(req,res)=>{
    const result = await userLogin(req);
    res.status(200).json(result);
};
exports.update_Profile = async(req,res)=>{
    const result = await user_profile_update(req);
    res.status(200).json(result)
};
exports.update_Profile_Password = async(req,res)=>{
    const result = await user_password_update(req);
    res.status(200).json(result);
};
exports.delete_Profile = async(req,res)=>{
    const result = await profile_delete(req);
    res.status(200).json(result);
};
exports.get_Profile = async(req,res)=>{
    const result = await profile_get(req);
    res.status(200).json(result);
};