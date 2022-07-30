const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var studentAttendanceSchema = new mongoose.Schema({
    rollNo:{
        type:Number,
        required:true              
    },    
    isPresent:{ 
        type: String,
        enum: ['Present', 'Absent'],
        default:'Present',                
    },
    studentStatus:{
        type:String,           
        trim:true,
        default:''
    },

    remarks:{
        type:String,
        trim:true,
        default:''
    },   

},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);

