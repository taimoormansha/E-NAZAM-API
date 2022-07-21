const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var requesterSchema = new mongoose.Schema({
    name:{
        type:String,
        trim: true,
        required:false,    
    },
    address:{
        type:String,
        trim: true,
        required:true,
    },      
    mobile:{
        type:String,
        required:true,
        trim: true,       
    },
    email:{
        type:String,
        trim: true,
        required:false,
        unique:false,
    },
    date: {  
        type: Date,
        default: Date.now 
    },
    details: 
        { 
            type: String,            
            required:true,
            trim: true,
        },
    isActive:
    {
        type: Boolean,
        default:true,
    },    
});

//Export the model
module.exports = mongoose.model('Requester', requesterSchema);