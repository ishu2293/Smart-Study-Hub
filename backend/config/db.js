const mongoose = require("mongoose");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect("mongodb://127.0.0.1:27017/studyhub");
=======
    await mongoose.connect(process.env.MONGO_URI);
>>>>>>> b8ac5c4c328e8dde96d9d1e6ee7e0e9b778b6612
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;