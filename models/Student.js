
const mongoose = require('mongoose');


// Declare Student Schema of the Mongo model
var studentSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male',
    },
    fatherName: {
        type: String,
        trim: true,
        required: true,
    },

    fatherOccupation: {
        type: String,
        trim: true,
        default: '',
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },

    mobile: { 
        type: String,
        default: ''
    },

    /*age:{
        type: Number,
        required: true,
    },*/

    islamicQualification: {
        type: String,
        trim: true,
        default: ''
    },

    schoolQualification: {
        type: String,
        trim: true,
        default: ''
    },

    shobaName: {
        type: String,
        required: true,
    },

    scholarship: {
        type: String,
        trim: true,
        required: false,
        default: 'NA'
    },

    isLocal: {
        type: String,
        enum: ['local', 'hostel'],
        default: 'local',
    },

    isActive: {
        type: String,
        enum: ['student', 'discharged'],
        default: 'student',
    }

},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Student', studentSchema); //mongoose.model(<Collectionname>, <CollectionSchema>)

