const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: new Date
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: 'Enter the type of exercise'
            },
            name: {
                type: String,
                trim: true,
                required: 'Enter the exercise name'
            },
            duration: {
                type: Number,
                required: 'Enter a exercise time duration'
            },
            weight: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            distance: {
                type: Number,
            }
        }
    ]
}); 

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;