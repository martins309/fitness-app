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

router.get('/parts', (req, res, next) => {
    res.render('template', {
        locals: {
            title: "Choose Body Part",
            is_logged_in: req.session.is_logged_in,
        }, 
        partials: {
            body: "partials/workouts_by_part",
        }
    });
});

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
            body: "partials/workouts_by_type",
        }
    });
})

router.get('/workout/:workout_id', async (req, res, next) => {
    const { workout_id } = req.params;
    const workoutDetails = await WorkoutModel.getWorkoutById(workout_id);
    const partsList = await WorkoutModel.getPartsByWorkoutId(workout_id);
    res.render('template', {
        locals: {
            title: workoutDetails.name,
            is_logged_in: req.session.is_logged_in,
            workoutDetails,
            partsList,
        },
        partials: {
            body: "partials/workout",
        }
    });
});

// Posts

router.post('/workout/add_workout', async (req, res, next) => {
    const { id, weight, reps, type_id } = req.body;
    const user_id = req.session.user_id;
    const newLoggedWorkout = await WorkoutModel.logWorkout(id, weight, null, null, reps, user_id);
    res.redirect(`/workouts/${type_id}`);
});

module.exports = router;


