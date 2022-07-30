
    const mongoose = require('mongoose'); // Erase if already required
    
    // Declare the Schema of the Mongo model
    var userSchema = new mongoose.Schema({
       
        scholarshipTitle: {
            type: String,
            trim: true,           
            required: true,
            unique: true        
        },
    
        stipendPercent: { 
            type: Number,        
            required: true,  
            min: 5,
            max: 100            
        }, 
        
        details:{
            type: String,
            trim: true,
            required: true   
        }
    },
    { timestamps: true }
    );
    
    //Export the model
    module.exports = mongoose.model('Scholarship', userSchema);