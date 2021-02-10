'use strict';

const session = require('express-session');

const express = require('express'),
    router = express.Router();
    

router.get('/', (req, res) => {
    res.render('template', {
        locals: {
            title: "Git Ript",
        },
        partials: {
            body: "partials/home",
        }
    })
});


module.exports = router;