const mongoose = require('mongoose'); 
// Declare the Schema of the Mongo model
var TerminalExamsSchema = new mongoose.Schema({   

    rollno:{
        type: Number,               
        required: true,
    },

    term:{
        type: String,
        enum: ['First Term', 'Second Term' , 'Final Term'],
        default: 'First Term',
    },
  
    courseTitle:{    //from MonthlyResults as well as Courses
        type:String,
        trim:true,
        required:true,      
    },
    
    totalMarks:{
        type:Number,
        default:100,
    },

    obtainedMarks:[{
        type:Number,
        default:0,
    }],   
    
    remarks:{
        type:String,
        default:'',
        trim:true,
    }
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('TerminalExamResult', TerminalExamsSchema);