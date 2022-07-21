const mongoose = require('mongoose'); 

var courseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        index:true,
    },
       
    darjaatID:{  //Darjaat object ID like 1 darjaat has many courses/subjects
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Darjaat',
    },
});


module.exports = mongoose.model('Course', courseSchema);