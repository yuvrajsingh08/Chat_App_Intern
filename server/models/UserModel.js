const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]
    },
    email : {
        type : String,
        required : [true,"provide email"],
        unique : true
    },
    phone : {
        type : String,
        required : [true, "provide phone number"]
    },
    profile_pic : {
        type : String,
        default : ""
    }
},{
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel