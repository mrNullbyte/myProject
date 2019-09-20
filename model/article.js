const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    author_ID : {
        type:Schema.Types.ObjectId, 
        ref:'UserSchema',
        required:true
    },
    articleTitle:{
        type: String,
        required: true,
    },
    articleContent:{
        type: String,
        required: true
    },
    articleImage:{
        type: String,
    },
    views:{
        type: Number
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

const article = mongoose.model('articleSchema',articleSchema)
module.exports = article;
