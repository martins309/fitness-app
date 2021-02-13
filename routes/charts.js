'use strict';

const { getTotalWeightByDate } = require('../models/chartsModel');
const { getTypeInfo } = require('../models/workoutModel');

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
    console.log(typeof type_id);
    const user_id = req.session.user_id;
    const typeData = await workoutModel.getTypeInfo(type_id);
    var d = new Date();
    let sums = [];
    let date_labels = []
    let label = null;
    for (let i = 0; i < 7; i++) {
        console.log(d);
        let d_curr = d.toDateString().substring(0, 11);
        date_labels.unshift(d_curr);
        console.log("THIS IS MY TYPE ID:", type_id);
        switch (type_id) {
            case '1' :
                label = "weight";
                console.log("AM I IN CASE 1");
                break;
            case '2' :
                label = "distance";
                break;
            case '4' :
                label = "duration";
                break;
            default :
            console.log("THIS IS THE CASE");
                break;
        }
        console.log(label);
        const sum = await chartModel.getTotalColumnByDate(user_id, d.toString().substring(0, 16), label);
        sums.unshift(Number(sum.total));
        d.setDate(d.getDate() - 1);
    }
    console.log(sums);
    console.log(date_labels);
    res.render('template', {
        locals: {
            title: type_id,
            is_logged_in: req.session.is_logged_in,
            sums,
            label: JSON.stringify(label),
            date_labels: JSON.stringify(date_labels),
            typeData
        }, 
        partials: {
            body:"partials/weightlifting_chart",
        }
    })
})

module.exports = router;