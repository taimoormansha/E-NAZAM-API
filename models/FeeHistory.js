const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var StudentFeeHistorySchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    Fee:{
        type: Number,
        default: 0
    },    

    Discount: {   //Scholarship 
        type: Number,
        default: 0,
    },

    totalFee:{
        type: Number,
        default: 0
    },

    paidFee: {
        type: Number,
        default: 0
    },

    isPaid: {
        type: String,
        enum: ['UnPaid', 'Paid'],
        default: 'UnPaid',
    },

    receiptNo: {
        type: Number,
        default: 0
    },

    Remarks: {
        type: String,
        trim: true,
        default: '',
    }
},
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model('FeeHistory', StudentFeeHistorySchema);