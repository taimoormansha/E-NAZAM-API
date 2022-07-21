const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var teacherSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true,      
        trim:true,
    },
    fatherName:{
        type:String,
        required:true,        
        trim:true,
    },

    address:[{
        city:{
            type: String,
            trim:true,
       },
       street:{
           type: String,
           trim:true,
       },
       houseNumber:{
           type: String,
           trim:true,
       }     
    }],

    mobile:[{
        type:String,
        required:true,
        trim:true,
        unique:true,
    }],

    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },

    joiningDate: {
        type: Date,
        default: Date.now,        
    },

    qualification:{
        islamic:{
            type:String,
            trim:true,
            required:true,
        },
    
        school:{
            type:String,
            trim:true,
            required:true,
        },    
    },

    isActive:{
        type:Boolean,
        default:true,       
    },
    
});

//Export the model
module.exports = mongoose.model('Teacher', teacherSchema);

