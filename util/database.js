const mongoose = require('mongoose');

exports.db = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/shoppingWebsite', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected");
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};
