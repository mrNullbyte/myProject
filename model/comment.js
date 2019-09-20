const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    author_ID : {
        type:Schema.Types.ObjectId, 
        ref:'UserSchema',
        required:true
    },
    article_ID:{
        type:Schema.Types.ObjectId, 
        ref:'articleSchema',
        required:true
    },
    comment:{
        type: String,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const comments = mongoose.model('commentSchema',commentSchema)
module.exports = comments;
