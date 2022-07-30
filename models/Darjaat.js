const mongoose = require('mongoose'); 

var darjaatSchema = new mongoose.Schema({
    darjaName:{
        type:String,
        trim:true,
        required:true,
        unique:true,       
    },
    duration:{
        type:String,
        required: true,
        trim:true,             
    },
   
    shobaName:{ 
        type:String,
        trim:true,
        required:true,
    },    
},
{ timestamps: true }
);

module.exports = mongoose.model('Darjaat', darjaatSchema);