import { db } from "../server.js";

export async function getBooks(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let order = "ASC";

    // Handling sorting and querying
    try {
      const result = await db.query(
        `SELECT * FROM books ORDER BY ${fieldName} ${order}`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.search) {
    const searchValue = req.query.search;

    try {
      const result = await db.query(
        `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1;`,
        [`%${searchValue}%`] // Parameterized query
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const result = await db.query("SELECT * FROM books");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const getBooksInfo = async (req, res) => {
  const idToShow = req.params.id;

  try {
    const result = await db.query(
      `SELECT * FROM books WHERE book_id = $1`,
      [idToShow] // Parameterized query
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

export async function deleteBook(req, res) {
  const idToDelete = Number(req.params.id);

  try {
    await db.query("BEGIN"); // Start transaction

    // Deleting the book
    const deleteResult = await db.query(
      "DELETE FROM books WHERE book_id = $1 RETURNING *",
      [idToDelete]
    );

    // If the book doesn't exist
    if (deleteResult.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Book not found" });
    }

    // Check for existing loans
    const loanCheckResult = await db.query(
      "SELECT book_id FROM loans WHERE book_id = $1",
      [idToDelete]
    );

    if (loanCheckResult.rows.length > 0) {
      await db.query("ROLLBACK");
      return res.status(400).json({ message: "Book is currently on loan" });
    }

    // Commit transaction
    await db.query("COMMIT");
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(500).json({ message: "Error deleting book", error });
  }
}

export async function getBooksToLoan(req, res) {
  try {
    const result = await db.query(
      "SELECT book_id, title, status FROM books WHERE status = 'available' ORDER BY title"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function addBooks(req, res) {
  const { title, author, genre, description, status } = req.body;

  try {
    await db.query(
      "INSERT INTO books (title, author, genre, description, status) VALUES ($1, $2, $3, $4, $5)",
      [title, author, genre, description, status] // Parameterized query
    );
    res.status(201).json({ message: "Book inserted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateBook(req, res) {
  const bookId = Number(req.params.id);

  try {
    const result = await db.query(
      `UPDATE books SET title=$1, author=$2, genre=$3, description=$4, status=$5 WHERE book_id=$6 RETURNING *`,
      [
        req.body.title,
        req.body.author,
        req.body.genre,
        req.body.description,
        req.body.status,
        bookId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res
      .status(200)
      .json({ message: "Book updated successfully", book: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
}

export const categorizeBooks = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT genre, COUNT(*) AS book_count FROM books GROUP BY genre ORDER BY book_count DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
