var mongoose = require('mongoose');

var expendeturesSchema = new mongoose.Schema({
  
    title: {
        type: String,
        required:true,
        trim: true,
    },
    
    totalPrice: { 
        type: Number,
        required:true,        
    },
   
    details: 
    { 
        type: String,            
        required:true,
        trim: true,
    },  
    
    byTeacherID:{
        type:Number,
        required:false,  
        default:00     
    },
    byName:{
        type:String,
        required:false,      
        trim:true,
        default:''
    },      
},
{ timestamps: true }
);

module.exports = mongoose.model('Expendeture', expendeturesSchema);
  

