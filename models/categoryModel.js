/* eslint-disable linebreak-style */
'use strint';
var mongoose = require ('mongoose');

var categoryModel = function(){
    var categorySchema = mongoose.Schema({
        name: String
    });

    return mongoose.model('Category', categorySchema);
};

module.exports = new categoryModel();
