const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var teacherAttendanceSchema = new mongoose.Schema({
    teacherID:{
        type:Number,        
        unique:false             
    },    
    isPresent:{ 
        type: String,
        enum: ['Present', 'Absent'],
        default:'Present',                
    },
    tacherStatus:{
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
module.exports = mongoose.model('TeacherAttendance', teacherAttendanceSchema);

