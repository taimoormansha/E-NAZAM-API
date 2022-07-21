const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var teacherAttendanceSchema = new mongoose.Schema({
    teacherName:{  //1 tacher has many attendance
        type:mongoose.Schema.Types.ObjectId,        
        ref: 'Teacher',        
        //required: true,
    },

    isPresent:{
        type:Boolean,
        default:true,             
        
    },
    tacherStatus:{
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
    
    
});

//Export the model
module.exports = mongoose.model('TeacherAttendance', teacherAttendanceSchema);

