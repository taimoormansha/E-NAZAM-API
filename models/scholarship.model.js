const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var scholarshipSchema = new mongoose.Schema({
    scholarshipTitle: {
        type: String,
        trim: true,
        unique:true,
        required: true        
    },

    stipend: { 
        type: Number,        
        required: true,              
    }, 
    
    details:{
        type: String,
        trim: true,
        required: true   
    }
    
});

//Export the model
module.exports = mongoose.model('Scholarship', scholarshipSchema);