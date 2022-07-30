const mongoose = require('mongoose'); 
// Declare the Schema of the Mongo model
var MonthlyResultSchema = new mongoose.Schema({   

    rollno:{
        type: Number,               
        required: true,
    },
  
    courseTitle:{    //from courses
        type:String,
        trim:true,
        required:true,      
    },
    
    totalMarks:{
        type:Number,
        default:100,
    },

    obtainedMarks:{
        type:Number,
        default:0,
    },   
    
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('MonthlyExamsResult', MonthlyResultSchema);