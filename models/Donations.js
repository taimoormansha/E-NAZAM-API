const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var donationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:false,        
        trim: true,
        default:''
    },
    email:{
        type:String,
        required:false,        
        trim: true,
        default:''
    },
    mobile:{
        type:String,
        required:false,
        trim: true,
        default:''
    },
    donateRS:{
        type:Number,
        required: true,
    },
    donateNature:{
        type: String,
        enum: ['Offline payment', 'Online payment'],        
        default:'Offline payment'
    },
    receiptNo:{
        type:Number,
        unique:true,
        required: true,
    },    
    address:{
        type:String,
        trim: true,
        required:true,
    },
    remarks:{
        type:String,
        trim: true,
        required: false,
        default:''
    }
},
{ timestamps: true }
);

//Export the model
module.exports = mongoose.model('Donation', donationSchema);