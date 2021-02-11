'use strict';

const express = require('express'),
    router = express.Router(),
    UserModel = require('../models/usersModel');


//get data from the profile page
router.get('/', async (req, res, next) => {
    const profileView = await UserModel.User()
    res.render('template', {
        locals: {
            title: "Profile_View",
            is_logged_in: req.session.is_logged_in,
            profileView,
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




//edit information on profile 
router.get('/profile', async (req, res, next) => {
    const profileView = await UserModel.User()
    res.render('template', {
        locals: {
            title: "EditProfile Page",
            is_logged_in: req.session.is_logged_in,
            profileView
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
        res.redirect('/index/profileView');
    }else {
        res.sendStatus(400);
    }
});

});





module.exports = router;