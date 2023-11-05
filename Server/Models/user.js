const mongoose = require('mongoose');
const {Schema,model} = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        name:{
            type:String,
            trim: true,
            required: true,
            unique: true
        },
        email:{
            type:String,
            trim: true,
            required: true,
            unique: true
        },
        password:{
            type:String,
            trim: true,
            required: true,
            set : (v) => {
            return bcrypt.hashSync(v, bcrypt.genSaltSync(12));
        },
        },
        role:{
            type:String,
            trim: true,
            default:0
        },
        photo:{
            data:Buffer,
            contentType:String
        }
    },
    {versionKey: false,timestamps: true}
);

const userModel = model('users',userSchema);

module.exports = userModel;