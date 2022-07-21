
var mongoose = require('mongoose');
var expendeturesSchema = new mongoose.Schema({
        
    date: {  
        type: Date, 
        default: Date.now 
    },

    title: {
        type: String,
        required:true,
        trim: true,
    },
    
    price: { 
        type: Number,
        required:true,        
    },

    details: 
    { 
        type: String,            
        required:true,
        trim: true,
    },  
    
    notedByID:{ //who is going to note expenses?
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher',        
    },        
});

module.exports = mongoose.model('Expendeture', expendeturesSchema);
  

