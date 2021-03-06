const router = require('express').Router();
const Workout = require('../models/workout.js');

// Created the post route to create a workout
router.post('/api/workouts',({body},res)=>{
    console.log(body)
    Workout.create(body).then((workoutData)=>{
        res.json(workoutData);
    }).catch((err)=>{
        res.json(err);
    });
});

//Route to update a workout
router.put('/api/workouts/:id',({body,params},res)=>{
    Workout.findByIdAndUpdate(
        params.id,
        { $push: {exercises:body}}
    ).then((workoutData)=>{
        res.json(workoutData);
    }).catch((err)=>{
        res.json(err);
    });
});

// Route to get all workouts 
router.get('/api/workouts',(req,res)=>{
    Workout.aggregate([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration',
                },
            },
        },
    ]).then((workoutData)=>{
        res.json(workoutData);
    }).catch((err)=>{
        res.json(err);
    });
});


// Route to get the latest 7 workouts 
router.get('/api/workouts/range',(req,res)=>{
    Workout.aggregate([
        {
            $addFields:{
                totalDuration:{
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({_id:-1})
    .limit(7)
    .then((workoutData)=>{
        res.json(workoutData);
    }).catch((err)=>{
        res.json(err);
    });
});


module.exports = router;