const mongoose = require('mongoose'); 

var darjaatSchema = new mongoose.Schema({
    darjaName:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        index:true,
    },
    isActive:{
        type:Boolean,
        default:true,       
    },
    duration:{
        type:String,
        required: true,
        trim:true,             
    },
    fee:{
         type:Number,
         required:true,
         min:0,
         max:5000,
    },
    shobajaatID:{  //Shoba object ID like 1 shoba has many darjaat
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shobajaat',
    },
    teacherID:{ // one teacher has many classes 
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Teacher',
    }
});


module.exports = mongoose.model('Darjaat', darjaatSchema);