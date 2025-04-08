import { db } from "../server.js";

export async function getLoans(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
    }

    try {
      const result = await db.query(
        `SELECT * FROM loans ORDER BY ${fieldName} ${sortingOrder}`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.search) {
    let searchValue = req.query.search;

    try {
      const result = await db.query(
        `SELECT loans.*, users.name AS user, books.title AS book 
         FROM loans 
         JOIN users USING(user_id) 
         JOIN books USING(book_id) 
         WHERE books.title ILIKE $1 OR users.name ILIKE $1;`,
        [`%${searchValue}%`] // Parameterized query
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const result = await db.query(
        `SELECT loans.*, users.name AS user, books.title AS book 
         FROM loans 
         JOIN users USING(user_id) 
         JOIN books USING(book_id)`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export async function getBooksLoaned(req, res) {
  const userId = Number(req.params.id);

  try {
    const result = await db.query(
      `SELECT loans.*, users.name AS user, books.title AS book 
       FROM loans 
       JOIN users USING(user_id) 
       JOIN books USING(book_id) 
       WHERE user_id = $1;`,
      [userId] // Parameterized query
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getLoanInfo = async (req, res) => {
  const idToShow = Number(req.params.id);

  try {
    const result = await db.query(
      `SELECT * FROM loans WHERE loan_id = $1;`,
      [idToShow] // Parameterized query
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(404).json(error);
  }
};

export async function deleteLoan(req, res) {
  const idToDelete = Number(req.params.id);

  if (typeof idToDelete !== "number") {
    return res.status(404).json({ message: "Loan not found" });
  }

  try {
    await db.query("BEGIN"); // Start transaction

    // Delete the loan record
    const deleteResult = await db.query(
      `DELETE FROM loans WHERE loan_id = $1 RETURNING *`,
      [idToDelete] // Parameterized query
    );

    if (deleteResult.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "Loan not found" });
    }

    // Commit transaction
    await db.query("COMMIT");
    res.status(200).json({ message: "Loan return deleted" });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(500).json({ message: "Error deleting loan", error });
  }
}

export async function addLoan(req, res) {
  const { book_id, user_id, loan_date, return_date, status } = req.body;

  if (status === "loaned") {
    return res.status(400).json({ error: "Book already loaned" });
  }

  try {
    await db.query("BEGIN"); // Start transaction

    // Insert the new loan record
    const insertResult = await db.query(
      `INSERT INTO loans (book_id, user_id, loan_date, return_date) 
       VALUES ($1, $2, $3, $4) RETURNING loan_id`,
      [book_id, user_id, loan_date, return_date] // Parameterized query
    );

    // Update the book status
    const updateResult = await db.query(
      `UPDATE books SET status = 'loaned' WHERE book_id = $1`,
      [book_id] // Parameterized query
    );

    if (updateResult.rowCount === 0) {
      await db.query("ROLLBACK");
      return res.status(400).json({ error: "Book already loaned" });
    }

    // Commit transaction if both queries succeed
    await db.query("COMMIT");
    res.status(201).json({ message: "Loan successful" });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(500).json({ error: "Loan failed", details: error });
  }
}

export async function updateLoan(req, res) {
  const { book_id, loan_id, return_date, is_returned } = req.body;

  try {
    await db.query("BEGIN"); // Start transaction

    // Update the loan record
    const updateLoanResult = await db.query(
      `UPDATE loans SET return_date = $1, is_returned = $2 WHERE loan_id = $3 RETURNING *`,
      [return_date, is_returned, loan_id] // Parameterized query
    );

    if (updateLoanResult.rowCount === 0) {
      await db.query("ROLLBACK");
      return res.status(400).json({ error: "Loan update failed" });
    }

    // Update the book status to 'available'
    const updateBookResult = await db.query(
      `UPDATE books SET status = 'available' WHERE book_id = $1`,
      [book_id] // Parameterized query
    );

    if (updateBookResult.rowCount === 0) {
      await db.query("ROLLBACK");
      return res.status(400).json({ error: "Book status update failed" });
    }

    // Commit transaction if both queries succeed
    await db.query("COMMIT");
    res.status(200).json({ message: "Loan updated successfully" });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(500).json({ error: "Loan update failed", details: error });
  }
}

export async function extendLoan(req, res) {
  const loan_id = req.params.id;

  try {
    const result = await db.query(
      `UPDATE loans SET return_date = return_date + INTERVAL '7 days', extension_count = extension_count + 1 WHERE loan_id = $1 RETURNING *`,
      [loan_id] // Parameterized query
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ message: "Loan extended" });
  } catch (error) {
    res.status(400).json({ error: "Loan extension failed", details: error });
  }
}
