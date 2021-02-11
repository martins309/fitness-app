'use strict';

const express = require('express'),
    router = express.Router(),
    UserModel = require('../models/usersModel');


//get data from the profile page
router.get('/profile', (req, res, next) => {
    res.render('template', {
        locals: {
            title: "Profile Page",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/profile"
        }
    });
});



router.get('/logout', (req, res, next) => {
    req.sessions.destroy();
    res.redirect('/');
})



router.post('/profile', async (req, res) => {
    const { username, password, phone_num, first_name, last_name, weight, height_ft, height_in, picture } = req.body;
    const response = await UserModel.User (
        username,
        password,
        phone_num,
        first_name,
        last_name,
        weight,
        height_ft,
        height_in,
        picture
    );
    console.log("PROFILE RESPONSE", response)
    if(response) {
        res.redirect('/index/profile');
    }else {
        res.sendStatus(400);
    }


router.get('/profile', (req, res, next) => {
    res.render('template', {
        locals: {
            title: "EditProfile Page",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/profile"
        }
    });
});


router.post('/profile', async (req, res) => {
    const { username, password, phone_num, first_name, last_name, weight, height_ft, height_in, picture } = req.body;
    const response = await UserModel.editUser (
        username,
        password,
        phone_num,
        first_name,
        last_name,
        weight,
        height_ft,
        height_in,
        picture
    );
    console.log("EDIT PROFILE RESPONSE", response)
    if(response) {
        res.redirect('/index/profile');
    }else {
        res.sendStatus(400);
    }
});

});





module.exports = router;