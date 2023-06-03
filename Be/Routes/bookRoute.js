const express = require("express");
const router = express.Router();
const Book = require("../Models/booksSchema");

// Create a new book
router.post("/books", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.genre ||
      !req.body.publicationYear
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ books: books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific book
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ book: book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book
router.put("/books/:id", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.genre ||
      !req.body.description ||
      !req.body.publicationYear
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a book
router.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  const searchRegex = new RegExp(query, 'i');

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: searchRegex } },
        { author: { $regex: searchRegex } },
        { genre: { $regex: searchRegex } }
      ]
    });

    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
