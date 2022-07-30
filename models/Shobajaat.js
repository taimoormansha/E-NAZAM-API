const mongoose = require('mongoose');

var shobajaatSchema = new mongoose.Schema({
    shobaName: {
        type: String,
        required: true,
        unique: true,
    },
    fee: {
        type: Number,
        default:0
    },
    isActive: {
        type: String,
        enum: ['Active', 'Postponed'],
        default: 'Active',
    }

}, { timestamps: true }
);

module.exports = mongoose.model('Shobajaat', shobajaatSchema);
