'use strict';

const { getTotalWeightByDate } = require('../models/chartsModel');

const express = require('express'),
    router = express.Router(),
    chart = require('chart.js'),
    chartModel = require('../models/chartsModel'),
    workoutModel = require('../models/workoutModel');


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

router.get('/:type_id', async (req, res, next) => {
    const { type_id } = req.params;
    const user_id = req.session.user_id;
    var d = new Date();
    let weights = [];
    let date_labels = []
    for (let i = 0; i < 7; i++) {
        console.log(d);
        d.to
        const weight = await chartModel.getTotalWeightByDate(d.toString().substring(0, 16));
        weights.unshift(Number(weight.total_weight));
        let d_curr = d.toDateString();
        date_labels.unshift(d_curr);
        d.setDate(d.getDate() - 1);
    }
    console.log(weights);
    console.log(date_labels);
    res.render('template', {
        locals: {
            title: type_id,
            is_logged_in: req.session.is_logged_in,
            weights,
            date_labels: JSON.stringify(date_labels),
        }, 
        partials: {
            body:"partials/weightlifting_chart",
        }
    })
})

module.exports = router;