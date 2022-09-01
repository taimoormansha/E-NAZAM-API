const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var StudentResultsSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
    },

    name: {
        type: String,
        trim: true,
    },

    fatherName: {
        type: String,
        trim: true,
    },

    shobaName: {
        type: String,
        trim: true,
    },
    monthYear:{
       type: String,
       default: (new Date().getFullYear()).toString() + (new Date().getMonth()).toString()
    },

    StudentResults: [{
        
            courseTitle: {
                type: String,
                trim: true,
            },

            totalMarks: {
                type: Number,
                default: 100,
            },

            obtainedMarks: {
                type: Number,
                default: 0,
            }  


    }]
},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Result', StudentResultsSchema);