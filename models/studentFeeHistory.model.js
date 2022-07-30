const mongoose = require('mongoose');
const dayjs = require('dayjs');

// Declare the Schema of the Mongo model
var StudentFeeHistorySchema = new mongoose.Schema({
    paidFee: { 
        type: Number,        
        required: true,              
    },

    Discount :{
        type: Number,        
        default:0,
    },

    remainingFee: { 
        type: Number,        
        default:0,       
    },

    feeMonth: {
        type: String,
        default: dayjs().format('M-YYYY'),
        required: [true, 'Please Enter Fee Month'],
    },

    submissionDate: {
        type: Date,
        default: Date.now,        
    },

    isActive:{
        type: Boolean,
        default: false,        
    },

    receiptNo: { 
        type: Number,        
        required: true,              
    },

    studentID:{
        type: mongoose.Schema.Types.ObjectId,        
        required:true,
        ref: 'Student'
    },

    Remarks:{
        type:String,
        trim:true,
        default:'',
    }

});

//Export the model
module.exports = mongoose.model('FeeHistory', StudentFeeHistorySchema);