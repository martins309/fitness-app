const express = require('express'),
    router = express.Router(),
    bycrypt = require('bcryptjs'),
    UserModel = require('../models/usersModel');

// Gets

router.get('/', (req, res, next) => {
    res.render('template', {
        locals: {
            title: "Login Page",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/login",
            header: "partials/blank_header"
        }
    });
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
})



router.get('/signup', async (req, res, next) => {
    res.render('template', {
        locals: {
            title: "Sign up Page",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: "partials/signup",
            header: "partials/blank_header"
        }
    })
});

// Posts
router.post('/login', async (req, res) => {
    const { username, password  } = req.body;
    const user = new UserModel(null, username, password, null, null, null, null, null, null, null, null);
    const response = await user.login();
    if(!!response.isValid) {
        //do stuff if a user is loggen in
        req.session.is_logged_in = response.isValid;
        req.session.user_id = response.user_id;
        req.session.username = response.username;
        res.redirect('/workouts');
    }else {
        res.sendStatus(403);
    }
});

router.post('/signup', async (req, res) => {
    const { username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num } = req.body;
    const salt = bycrypt.genSaltSync(10);
    const hash = bycrypt.hashSync(password, salt);
    const response = await UserModel.addUser (
        username,
        hash,
        first_name,
        last_name,
        weight,
        height_ft,
        height_in, 
        age,
        phone_num
    );
    if(response.id) {
        res.redirect('/');
    }else {
        res.send("Error: please try again").status(500);
    }
});


module.exports = router;