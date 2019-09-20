const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim:true
    },
    userName:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required:true,
        maxlength:20,
        minlength:8,
        trim: true
    },
    Gender:{
        type: String,
        required: true,
        enum:['male','female']

    },
    role:{
        type: String,
        default:'user',
        enum:['user','admin']
    },
    mobile:{
        type: String,
        required: true,
        trim: true
    },
    avatar:{
        type: String,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    update_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Users = mongoose.model('UserSchema',UserSchema)
module.exports = Users;
