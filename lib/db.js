/* eslint-disable no-unused-vars */
'use strict';
var mongoose = require ('mongoose');
var db = function(){
    return {
        // eslint-disable-next-line no-unused-vars
        config: function (conf){
            mongoose.connect('mongodb://localhost/hackbook');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'Connection error'));
            db.once('open', function(){
                console.log('db connection open');

            });
        }
    };
};


module.exports = db();
