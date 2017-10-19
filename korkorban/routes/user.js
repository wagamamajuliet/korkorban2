var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
    User.find({user: req.user}, function(err, users) {
        if (err) {
            return res.write('Error!');
        }
        res.render('user/profile', { name:req.user.name ,email: req.user.email, password:req.user.password });
    });
    // res.render('user/profile');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    if(req.session.user) {
        
        // res.redirect('/');
        req.session.user.destroy(function(err) {
            if(err) {
                console.log('세션 삭제 시 에러 발생');
                return;
            }
            console.log('세션 삭제');
            res.redirect('/profile');
        });
    } else {
        console.log('로그인 되어 있지 않습니다.');
        res.redirect('/');
    }

});

// router.use('/', notLoggedIn, function(req, res, next) {
//     if (req.session.oldUrl) {
//         var oldUrl = req.session.oldUrl;
//         req.session.oldUrl = null;
//         res.redirect(oldUrl);
//     } else {
//         res.redirect('/');
//     }
// });

router.get('/signup', function (req, res, next) {
    if(req.session.user) {
        res.redirect('/');
    } else {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
    }
});

// router.get('/signup', isLoggedIn, function (req, res, next) {
//        res.redirect('/profile');
// });

router.post('/signup', passport.authenticate('local.signup', {
    // successRedirect: '/user/profile',
    // failureRedirect: '/user/signup',
    // successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile');
    }
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

// router.get('/signin', isLoggedIn, function (req, res, next) {
//     res.redirect('/profile');
// });
router.post('/signin', passport.authenticate('local.signin', {
    // successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}