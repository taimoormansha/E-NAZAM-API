const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({   

    studentID:{  //1 student has many results
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student',
    },

    courseID:{  //1 student has many results
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    
    totalMarks:{
        type:Number,
        default:100,
    },

    obtainedMarks:{
        type:Number,
        default:0,
    },

    examDate:{
        type: Date,
        default: Date.now,
    },
    
    isPresent:{
        type:Boolean,
        default:true,
    },

    isPass:{
        type:Boolean,
        default:true,
    },
    
    remarks:{
        type:String,
        required:true,
        trim:true,
    },
    
});

//Export the model
module.exports = mongoose.model('User', userSchema);