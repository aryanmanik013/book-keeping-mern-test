const mongoose = require("mongoose");
const booksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },  
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Date,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timeStamps: true }
);

const books = mongoose.model("books", booksSchema);
module.exports = books;
