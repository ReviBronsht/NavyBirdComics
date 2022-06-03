let mongoose = require('mongoose'); // requires mongodb

// creates new schema for images
const image_schema = new mongoose.Schema({
    type:{type:String, required: true},
    name:{type:String},
    chapter:{type:Number},
    chapters:{type:[String]},
    last_page_prev_chapter:{type:Number},
    pages:{type:[String]},
    comments_users:{type:[String]},
    comments_comments:{type:[String]}
}, {collection:'images'});

// creates mongoose model for images from schema
const image_model = mongoose.model('image_model',image_schema);

// exports model
module.exports = image_model;