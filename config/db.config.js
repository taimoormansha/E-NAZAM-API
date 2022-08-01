const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;
//Database connection
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

module.exports = connection;
