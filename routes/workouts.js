'use strict';

const express = require('express'),
    router = express.Router(),
    WorkoutModel = require('../models/workoutModel');


    // Gets
router.get('/', async (req, res, next) => {
    const typeList = await WorkoutModel.getAllTypes();
    res.render('template', {
        locals: {
            title: "workout_list",
            is_logged_in: req.session.is_logged_in,
            typeList,
        },
        partials: {
            body: "partials/type_list",
        }
    });
})

router.get('/:type_id', async (req, res, next) => {
    const { type_id } = req.params;
    const workoutList = await WorkoutModel.getAllWorkoutsByType(type_id);
    res.render('template', {
        locals: {
            title: "Workouts",
            is_logged_in: req.session.is_logged_in,
            workoutList,
        },
        partials: {
            body: "workouts_by_type",
        }
    });
})

// router.get('/:workout_id', async (req, res, next) => {
//     const { workout_id } = req.params;
//     const workoutDetails = 
// })

module.exports = router;


