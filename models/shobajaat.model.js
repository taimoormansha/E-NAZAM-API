const mongoose = require('mongoose'); 

var shobajaatSchema = new mongoose.Schema({
    shobaName:{
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
   
});

module.exports = mongoose.model('Shobajaat', shobajaatSchema);