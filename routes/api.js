const router = require('express').Router();
const Workout = require('../models/workout');
const path = require('path');

router.get('/api/workouts', async (req, res) => {
    try {
        const workoutData = await Workout.find({})

        res.json(workoutData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(workoutData => {
        console.log(workoutData);
        

        res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body }}, { new: true })
    .then(workoutData => {
        console.log(workoutData);
        

        res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});




module.exports = router;