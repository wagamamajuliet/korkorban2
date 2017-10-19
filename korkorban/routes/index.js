var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');

var Product = require('../models/product');
/* GET home page. */
router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('main/korkorban', {products: productChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});

// router.get('/add-to-cart/:id', function(req, res, next) {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});

//     Product.findById(productId, function(err, product ,imagePath) {
//        if (err) {
//            return res.redirect('/');
//        }
//         cart.add(product, product.id, product.imagePath);
//         req.session.cart = cart;
//         console.log(req.session.cart);
//         res.redirect('/');
//     });
// });

// router.get('/plus/:id', function(req, res, next) {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});

//     cart.plusByOne(productId);
//     req.session.cart = cart;
//     res.redirect('/shopping-cart');
// });

// router.get('/reduce/:id', function(req, res, next) {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});

//     cart.reduceByOne(productId);
//     req.session.cart = cart;
//     res.redirect('/shopping-cart');
// });

// router.get('/remove/:id', function(req, res, next) {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});

//     cart.removeItem(productId);
//     req.session.cart = cart;
//     res.redirect('/shopping-cart');
// });

router.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   } 
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
