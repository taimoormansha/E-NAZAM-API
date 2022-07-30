const mongoose = require('mongoose'); 

var courseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },   
    courseCoverPicture: {
        type: String,
        required: false,
        default:''
      },
    totalMarks:{
        type:Number,
        default:100,
    },  
    shoba:{  
        type: Array,
        required: false,
        default:''        
    }
},{ timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);