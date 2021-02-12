'use strict';
const express = require('express'),
    router = express.Router(),
    chart = require('chart.js'),
    chartModel = require('../models/chartsModel');


router.get('/', (req, res, next) => {
    res.render('template', {
        locals: {
            title: "charts",
            is_logged_in: req.session.is_logged_in,
            test_num: 3000,
        },
        partials: {
            body: "partials/progress_charts"
        }
    });
});

module.exports = router;