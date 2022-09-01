const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var teacherSchema = new mongoose.Schema({
    teacherID: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    fatherName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default:'Male',      
    },

    address: {        
            type: String,
            trim: true,
            required:true,       
    },

    mobile: {
        type: String,
        required: true,
        trim: true,  
        unique: false     
    },

    email: {
        type: String,
        trim: true,
        required: true,  
        unique: false     
    },

    islamicQualification: {
        type: String,
        trim: true,
        default:''
    },

    schoolQualification: {
        type: String,
        trim: true,
        default:''
    },

    isActive: {
        type: String,
        enum: ['Yes', 'Not'],
        default:'Yes',      
    },

}, { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Teacher', teacherSchema);

