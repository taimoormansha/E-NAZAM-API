
const mongoose = require('mongoose'); 


// Declare Student Schema of the Mongo model
var studentSchema = new mongoose.Schema({
    rollno:{
        type: Number,
        unique: true,        
        required: true,
    },

    name:{ 
        type:String,
        trim: true,
        required: true,             
    },

    fatherName:{ 
        type: String,
        trim: true,
        required: true,                
    },

    fatherOccupation:{ 
        type: String,
        trim: true,
        default:'',                           
    },

    contactInfo: [{
        relation:{
            type:String,
            required:true,
            trim:true,
        },

        mobile:[{
            type:String,
            required:true,
            trim:true,
            unique:true,
        }],
    
        email:{
            type:String,
            trim:true,            
            unique:true,
        },

        city:{
            type: String,
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
    }],
        
    dateOfBirth: {
        type: Date,
        required: true,      
    },

    dateOfAdmission: {
        type: Date,
        default: Date.now,        
    },

    /*age:{
        type: Number,
        required: true,
    },*/

    qualification:{
        islamic:{
            type:String,
            trim:true,            
            default:''
        },
    
        school:{
            type:String,
            trim:true,            
            default:''
        },    
    },

    isLocal:{
        type: Boolean,
        default: true,        
    },

    isActive:{
        type: Boolean,
        default: true,        
    },
    
    scholarshipDetails:{  
        scholarshipID:{
            type: mongoose.Schema.Types.ObjectId,        
            default: '',
            ref: 'Scholarship'
        },

        selectionDate:{
            type: Date,
            default: Date.now,
        }

    },

    studentShoba:{
        type: mongoose.Schema.Types.ObjectId,        
        required:true,
        ref: 'Shobajaat'
    },

    studentDarja:{
        type: mongoose.Schema.Types.ObjectId,        
        required:true,
        ref: 'Darjaat'
    },
   
});

//Export the model
module.exports = mongoose.model('Student', studentSchema); //mongoose.model(<Collectionname>, <CollectionSchema>)

