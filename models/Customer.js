const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

    CustomerName: {
      type: String,
      required: true,
    },  
    CustomerEmail: {
      type: String,
      required: true,
    },
    CustomerAddress: {
      type: String,
      required: true,
    },
    CustomerPhoneNo: {
      type: String,
      required: true,
    },
    CustomerType: {
      type: String,
      required: true,
    },
    CustomerLocation: {
      type: String,
      required: true,
    },
    CustomerRegion: {
      type: String,
      required: true,
    },
    CustomerField: {
      type: String,
      required: true,
    },
    CustomerIntrest: {
      type: String,
      required: true,
    },
  });
  
module.exports = mongoose.model('Customer',CustomerSchema);