/* eslint-disable no-console */
'use strict';

var Book= require('../models/bookModel');
var Category = require('../models/categoryModel');


module.exports = function (router) {
    router.get('/', function (req, res){
        res.render('manage/books');

    });

    router.get('/books', function (req, res){
        Book.find({}, function(err, books){
            if(err)throw err;
            var model = {
                books: books

            };

            res.render('manage/books/index', model);


        });

    });

    router.post('/books', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var description = req.body.description && req.body.description.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var cover = req.body.cover && req.body.cover.trim();
        var category = req.body.category && req.body.category.trim();
        var price  = req.body.price && req.body.price.trim();

        if(title === '' || price === ''){
            req.flash('error', 'Please fill out the required field');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        if(isNaN(price)){
            req.flash('error', 'Price must be a number');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');

        }

        var newBook =  new Book({
            title: title,
            description: description,
            publisher: publisher,
            cover: cover,
            category: category,
            price: price
        });
        newBook.save(function(err){
            if(err){

                console.log(err);

            }

            req.flash('success', 'Book Added  successfully');
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });




    router.get('/books/edit/:id', function(req, res){
        Category.find({}, function(err, categories){
            Book.findOne({_id: req.params.id}, function(err, book){
                if(err)throw err;
                var model ={
                    book: book,
                    categories:categories
                };

                res.render('manage/books/edit', model);

            });

        });



    });

    router.post('/books/edit/:id', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var description = req.body.description && req.body.description.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var cover = req.body.cover && req.body.cover.trim();
        var category = req.body.category && req.body.category.trim();
        var price  = req.body.price && req.body.price.trim();

        if(title === '' || price === ''){
            req.flash('error', 'Please fill out the required field');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');
        }

        if(isNaN(price)){
            req.flash('error', 'Price must be a number');
            res.location('/manage/books/add');
            res.redirect('/manage/books/add');

        }

        Book.update({_id: req.params.id}, {
            title: title,
            description: description,
            publisher: publisher,
            cover: cover,
            category: category,
            price: price
        }, function(err){
            if(err){
                console.log(err);

            }

            req.flash('success', 'Book updated  successfully');
            res.location('/manage/books');
            res.redirect('/manage/books');
        });

    });

    router.get('/books/add', function(req, res){
        Category.find({}, function(err, categories){
            if(err){ throw err;
            }
            var model = {
                categories: categories
            };

            res.render('manage/books/add', model);

        });
    });

    router.delete('/books/delete/:id', function(req, res){
        Book.remove({_id: req.params.id}, function(err){
            if(err)throw err;
            req.flash('success', 'Book deleted');
            res.location('/manage/books');
            res.redirect('/manage/books');

        });
    });



    router.get('/categories/add', function(req, res){
        res.render('manage/categories/add');
    });



    router.get('/categories/edit/:id', function(req, res){
        Category.findOne({_id: req.params.id}, function(err, category){
            if(err){throw err;
            }

            var model ={
                category:category
            };

            res.render('manage/categories/edit', model);

        });
    });


    router.get('/categories', function (req, res){
        Category.find({}, function(err, categories){
            if(err){throw err;
            }
            var model = {
                categories: categories
            };

            res.render('manage/categories/index', model);


        });
    });


    router.post('/categories', function(req, res){
        var name = req.body.name && req.body.name.trim();

        if(name == ''){
            req.flash('error', 'Please fill out the required field');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        }

        var newCat =  new Category({
            name: name
        });
        newCat.save(function(err){
            if(err){
                console.log(err);
            }

            req.flash('success', 'Category Added  successfully');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });


    router.post('/categories/edit/:id', function(req, res){
        var name = req.body.name && req.body.name.trim();

        if(name === ''){
            req.flash('error', 'Please fill out the required field');
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }


        Category.update({_id: req.params.id}, {
            name: name
        }, function(err){
            if(err){
                console.log(err);

            }

            req.flash('success', 'Category updated  successfully');
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });



    router.delete('/categories/delete/:id', function(req, res){
        Category.remove({_id: req.params.id}, function(err){
            if(err){throw err;
            }
            req.flash('success', 'Category deleted');
            res.location('/manage/categories');
            res.redirect('/manage/categories');

        });
    });
};
