'use strict';

const express = require('express'),
    router = express.Router(),
    UserModel = require('../models/usersModel');


//get data from the profile page
router.get('/', async (req, res, next) => {
    const user_id = req.session.user_id;
    const userInfo = await UserModel.getUserInfo(user_id);
    const loggedWorkouts = await UserModel.getLoggedWorkouts(user_id);
    res.render('template', {
        locals: {
            title: "Profile_View ",
            is_logged_in: req.session.is_logged_in,
            userInfo,
            loggedWorkouts,
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
router.get('/profile_edit', async (req, res, next) => {
    const user_id = req.session.user_id;
    const userInfo = await UserModel.getUserInfo(user_id);
    res.render('template', {
        locals: {
            title: "EditProfile Page",
            is_logged_in: req.session.is_logged_in,
            userInfo
        },
        partials: {
            body: "partials/profile_edit"
        }
    });
});

// Posts
router.post('/edit_profile', async (req, res) => {
    const { username, phone_num, first_name, last_name, weight, height_ft, height_in, age } = req.body;
    const user_id = req.session.user_id;
    const response = await UserModel.editUser(
        username,
        first_name,
        last_name,
        weight,
        height_ft,
        height_in,
        age,
        phone_num,
        user_id
    );
    console.log("EDIT PROFILE RESPONSE", response)
    if(response) {
        res.redirect('/profile');
    }else {
        res.sendStatus(400);
    }
});


module.exports = router;