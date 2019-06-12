'use strict';

var Book = require('../models/bookModel');


module.exports = function (router) {
    router.get('/', function (req, res) {
        Book.find({}, function(err, books){
            if(err){ throw err;
            } else {
                books.forEach(function(book){
                    book.truncateText = book.truncateText(10);
                });
                var model = {
                    books: books

                };

                res.render('index', model);
            }
        });
    });
};
