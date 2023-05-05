// const { uniqueId } = require("lodash");
const mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");
const crypto = require("crypto");

var userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim: true,
        maxLength:32
    },
    email:{
        type:String,
        required:true,
        unique: true,
        maxLength:32
    },
    user_info:{
        type:String,
        maxLength:300
    },
    salt:String,
    encry_password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }

},{timestamps:true})

userSchema.virtual("password").set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
}).get(function(){
    return this._password;
});


userSchema.methods={
    authenticate: function(plainpassword){
       return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword : function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try{
            return crypto
               .createHmac('sha256', this.salt)
               .update(plainpassword)
               .digest('hex');
        }
        catch(err){
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);