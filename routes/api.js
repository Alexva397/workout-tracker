const router = require('express').Router();
const Workout = require('../models/workout');

// router.get('/api/workouts', async (req, res) => {
//     try {
//         const workoutData = await Workout.find({})

//         res.json(workoutData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        }
    ])
    .then(workoutData => {
        console.log(workoutData);

        res.json(workoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
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


router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' }
            }
        }
    ])
    .sort({ _id: -1 })
    .limit(7)
    .then(workoutRangeData => {
        console.log(workoutRangeData);

        res.json(workoutRangeData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


router.delete('/api/workouts', ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);
    });
});




module.exports = router;