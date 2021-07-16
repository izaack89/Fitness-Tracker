const router = require('express').Router();
const Workout = require('../models/workout.js');

// Created the post route to create a workout
router.post('/api/workouts',(req,res)=>{
    Workout.create({}).then((workoutData)=>{
        res.json(workoutData);
    }).catch((err)=>{
        res.json(err);
    });
});

//Route to update a workout
router.put('/api/workouts/:id',({body,params},res)=>{
    Workout.findByIdAndUpdate(
        params.id,
        { $push: {exercise:body}}
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
