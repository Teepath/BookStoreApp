/* eslint-disable linebreak-style */
'use strict';
//var Category = require('../models/categoryModel');
var Book = require('../models/bookModel');
module.exports = function (router) {
    router.get('/', function (req, res){
    //get cart from session
        var cart = req.session.cart;
        var displayCart = {items:[], total:0};
        var total = 0;

    // Get total
        for(var item in cart){
            displayCart.items.push(cart[item]);
            total +=(cart[item].qty * cart[item].price);
        }

        displayCart.total = total;

    //Render cart
        res.render('cart/index',{
            cart: displayCart
        });
    });

    router.post('/:id', function (req, res){
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        Book.findOne({_id: req.params.id}, function(err, book){
            if(err){
                console.log(err);
            }
            if(cart[req.params.id]){
                cart[req.params.id].qty++;
            }
            else {
                cart[req.params.id] ={
                    item: book._id,
                    title: book.title,
                    price: book.price,
                    qty: 1
                }
            }

            res.redirect('/cart');

        });
    });

    router.get('/remove', function(req, res){
        req.session.cart = {};
        res.redirect('/cart');
    });
};
