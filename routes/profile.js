'use strict';

const express = require('express'),
    router = express.Router(),
    chartModel = require('../models/chartsModel'),
    UserModel = require('../models/usersModel');


//get data for the profile page
router.get('/', async (req, res, next) => {
    const user_id = req.session.user_id;
    const userInfo = await UserModel.getUserInfo(user_id);
    const loggedWorkouts = await UserModel.getLoggedWorkouts(user_id);
    var d = new Date();
    let sums = [];
    let date_labels = []
    let label = "weight";
    for (let i = 0; i < 7; i++) {
        let d_curr = d.toDateString().substring(0, 11);
        date_labels.unshift(d_curr);
        const sum = await chartModel.getTotalColumnByDate(user_id, d.toString().substring(0, 16), label);
        sums.unshift(Number(sum.total));
        d.setDate(d.getDate() - 1);
    }
    res.render('template', {
        locals: {
            title: `${userInfo.first_name} Profile`,
            is_logged_in: req.session.is_logged_in,
            userInfo,
            loggedWorkouts,
            sums,
            label: JSON.stringify(label),
            date_labels: JSON.stringify(date_labels),
        },
        partials: {
            body: "partials/profile",
            header: "partials/header"
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
            body: "partials/profile_edit",
            header: "partials/header"
        }
    });
});

router.get('/loggedworkouts', async (req, res, next) => {
    const user_id = req.session.user_id;
    console.log("I am Here!");
    const userInfo = await UserModel.getUserInfo(user_id);
    const loggedWorkouts = await UserModel.getLoggedWorkouts(user_id);
    res.render('template', {
        locals: {
            title: "Logged Workouts",
            is_logged_in: req.session.is_logged_in,
            userInfo,
            loggedWorkouts,
        },
        partials: {
            body: "partials/logged_workouts",
            header: "partials/header"
        }
    });
})

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