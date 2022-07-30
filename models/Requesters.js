const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var requesterSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: false,
        default:''
    },
    details:
    {
        type: String,
        required: true,
        trim: true,
    },
    when:
    {
        type: Date,
        required: true,        
    },
    isProceed:
    {
        type: String,
        enum: ['Pending', 'Promised'],
        default: 'Pending'
    },
},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Requester', requesterSchema);