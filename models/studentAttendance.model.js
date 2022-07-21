const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var studentAttendanceSchema = new mongoose.Schema({
    isPresent:{
        type:Boolean,
        default:true,             
        
    },
    studentStatus:{
        type:String,           
        trim:true,
    },

    attendanceDate: {
        type: Date,
        default: Date.now,        
    },

    remarks:{
        type:String,
        trim:true,
    },
    
    studentID:{  //1 student has many attendance
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student',
    },
});

//Export the model
module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);

