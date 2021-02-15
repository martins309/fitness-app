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

router.get('/todays', async (req, res, next) => {
    const user_id = req.session.user_id;
    const userInfo = await UserModel.getUserInfo(user_id);
    res.render('template', {
        locals: {
            title: "Today's Workouts",
            is_logged_in: req.session.is_logged_in,
            userInfo,
        },
        partials: {
            body: "partials/todays_workout"
        }
    });
});



router.get('/bodypart', (req, res, next) => {
    res.render('template', {
        locals: {
            title: "Choose Body Part",
            is_logged_in: req.session.is_logged_in,
        }, 
        partials: {
            body: "partials/part_graphic",
        }
    });
});

router.get('/addWorkout', async (req, res, next) => {
    res.render('template', {
        locals: {
            title: "Add a Workout",
            is_logged_in: req.session.is_logged_in,
        }, 
        partials: {
            body: "partials/add_workout",
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

router.get('/userworkout/:workout_id', async (req, res, next) => {
    const { workout_id } = req.params;
    const workoutDetails = await WorkoutModel.getUserWorkoutById(workout_id);
    res.render('template', {
        locals: {
            title: workoutDetails.name,
            is_logged_in: req.session.is_logged_in,
            workoutDetails,
        },
        partials: {
            body: "partials/userworkout",
        }
    });
});

router.get('/parts/:part_id', async (req, res, next) => {
    const { part_id } = req.params;
    const partInfo = await WorkoutModel.getPartInfo(part_id);
    const workoutList = await WorkoutModel.getAllWorkoutsByPart(part_id);
    res.render('template', {
        locals: {
            title: `${partInfo.name} Workouts`,
            is_logged_in: req.session.is_logged_in,
            workoutList,
            partInfo
        },
        partials: {
            body: "partials/workouts_by_parts",
        }
    });
});


router.get('/:type_id', async (req, res, next) => {
    const { type_id } = req.params;
    const user_id = req.session.user_id;
    const typeInfo = await WorkoutModel.getTypeInfo(type_id);
    const workoutList = await WorkoutModel.getAllWorkoutsByType(type_id);
    const userWorkoutList = await WorkoutModel.getAllUserWorkoutsByType(type_id, user_id);
    console.log("THIS IS THE USER WORKOUT LIST:", userWorkoutList);
    res.render('template', {
        locals: {
            title: `Workouts for ${typeInfo.name}`,
            is_logged_in: req.session.is_logged_in,
            workoutList,
            typeInfo,
            userWorkoutList,
        },
        partials: {
            body: "partials/workouts_by_type",
        }
    });
})

// Posts

router.post('/workout/add_workout', async (req, res, next) => {
    const { id, weight, reps, type_id } = req.body;
    const user_id = req.session.user_id;
    const newLoggedWorkout = await WorkoutModel.logWorkout(id, weight, null, null, reps, user_id);
    res.redirect(`/workouts/${type_id}`);
});

router.post('/userworkout/log_user_workout', async (req, res, next) => {
    const { id, weight, reps, type_id } = req.body;
    const user_id = req.session.user_id;
    const newLoggedWorkout = await WorkoutModel.logUserWorkout(id, weight, null, null, reps, user_id);
    res.redirect(`/workouts/${type_id}`);
});

router.post('/add_user_workout', async (req, res, next) => {
    const { name, type_id } = req.body;
    const user_id = req.session.user_id;
    const addUserWorkout = await WorkoutModel.addUserWorkout(user_id, name, type_id);
    res.redirect(`/workouts/${type_id}`);
});

module.exports = router;


