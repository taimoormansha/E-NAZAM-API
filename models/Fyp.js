const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    ProjectName:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    studentID:{  //1 student has many FYP
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student',
    },
    teacherID:{  //1 tacher has manage many FYP
        type:mongoose.Schema.Types.ObjectId,        
        ref: 'Teacher',        
        //required: true,
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);