// Import the mongoose package
const mongoose = require("mongoose");
// Init the mongoose Schema
const Schema = mongoose.Schema;

// Creating the schema 
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  exercises: [
    {
      name : {
        type : String,
        trim : true,
        required : "Please Enter the name of the Exercise"
      },
      type : {
        type: String,
        trim : true,
        required : "Please Enter what Type of Exercise"
      },
      distance : {
        type : Number
      },
      duration : {
        type : Number,
        required : "Please Enter the duration of the Exercise"
      },
      weight: {
        type : Number
      },
      sets: {
        type : Number
      },
      reps: {
        type : Number
      }
    }
  ]
});
const Workout = mongoose.model("workout", WorkoutSchema);

// Exporting the schema
module.exports = Workout;