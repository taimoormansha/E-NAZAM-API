const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var donationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:false,
        trim: true,
    },
    mobile:{
        type:String,
        trim: true,
    },
    password:{
        type:String,
        trim: true,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('Donation', donationSchema);