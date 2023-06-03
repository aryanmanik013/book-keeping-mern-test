const mongoose = require("mongoose");
const DB = "mongodb://localhost:27017/book-management";

mongoose
  .connect(DB)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Error connecting to DB");
  });
module.exports = mongoose;
