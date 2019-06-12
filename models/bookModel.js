/* eslint-disable linebreak-style */
'use strint';
var mongoose = require ('mongoose');

var bookModel = function(){
    var bookSchema = mongoose.Schema({
        title: String,
        author: String,
        description: String,
        publisher: String,
        category: String,
        price: Number,
        cover: String
    });

    bookSchema.methods.truncateText = function(length){
        return this.description.substring(0, length);
    };

    return mongoose.model('Book', bookSchema);
};

module.exports = new bookModel();
