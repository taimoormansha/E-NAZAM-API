const mongoose = require('mongoose'); 

// Declare Student Schema of the Mongo model
var StudentContacts = new mongoose.Schema({
    studentRollno:{
        type: Number,              
        default:00,
    },
    studentName:{
        type: String,              
        trim: true,
        default:''
    },

    name:{ 
        type:String,
        trim: true,
        required:true,             
    },
    
    relation:{
        type:String,
        required:true,
        trim:true,
    },

    mobile:{
        type:String,
        required:true,
        trim:true,       
    },

    email:{
        type:String,
        trim:true,
        default:''    
    },

    city:{
        type: String,
        required:true,
        trim:true,
   },

   street:{
       type: String,
       default:'',
       trim:true,
   },

   houseNumber:{
       type: String,
       default:'',
       trim:true,
   } 
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('StudentContact', StudentContacts); //mongoose.model(<Collectionname>, <CollectionSchema>)