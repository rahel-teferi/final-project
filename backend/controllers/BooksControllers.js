// import { db } from "../server.js";
import { client } from "../server.js";

// export async function getBooks(req, res) {
//   if (req.query.sort) {
//     const fieldName = req.query.sort;
//     let order = "ASC";
//     // if (req.query.order) {
//     //   sortingOrder = req.query.order;
//     db.query(
//       `select * from books ORDER BY ${fieldName} ${order}`,
//       (error, result) => {
//         if (error) {
//           res.status(400).json(error);
//         }
//         res.status(200).json(result);
//       }
//     );
//     // }
//   } else if (req.query.search) {
//     let searchValue = req.query.search;
//     db.query(
//       `SELECT * FROM books WHERE title like '%${searchValue}%' OR author like '%${searchValue}%';`,
//       [],
//       (error, result) => {
//         if (error) {
//           throw new Error(error);
//         }
//         res.status(200).json(result);
//       }
//     );
//   } else {
//     db.query("select * from books", (error, result) => {
//       res.status(200).json(result);
//     });
//   }
// }

// export const getBooksInfo = async (req, res) => {
//   let idToShow = req.params.id;
//   db.query(
//     `select * from books where book_id=${idToShow} `,
//     (error, result) => {
//       if (error) {
//         res.status(404).json(error);
//       }
//       res.status(200).json(result);
//       console.log(result);
//     }
//   );
// };

// export async function deleteBook(req, res) {
//   let idToDelete = Number(req.params.id);
//   db.beginTransaction((err) => {
//     db.query(
//       "DELETE FROM books WHERE book_id = ?",
//       [idToDelete],
//       (error, result) => {
//         if (error) {
//           return db.rollback(() => {
//             res.status(500).json({ error: "Book Deletion failed" });
//           });
//         }
//         db.query(
//           "SELECT book_id FROM loans where book_id=?",
//           [idToDelete],
//           (err, result) => {
//             if (result.length > 0) {
//               return db.rollback(() => {
//                 res.status(400).json({ error: "Book Deletion failed" });
//               });
//             }

//             // Commit transaction if both queries succeed
//             db.commit((err) => {
//               if (err) {
//                 return db.rollback(() => {
//                   res.status(500).json({ error: "loan commit failed" });
//                 });
//               }

//               res.status(201).json({
//                 message: "Deletion successfull",
//               });
//             });
//           }
//         );
//       }
//     );
//   });
// }

// export async function getBooksToLoan(req, res) {
//   db.query(
//     "SELECT book_id, title, status FROM books WHERE status='available' ORDER BY title",
//     (error, result) => {
//       if (error) {
//         res.status(404).json({ message: error.sqlMessage });
//       } else {
//         res.status(200).json(result);
//       }
//     }
//   );
// }

// export async function addBooks(req, res) {
//   const { title, author, genre, description, status } = req.body;

//   db.query(
//     "INSERT INTO books (title, author, genre, description, status) VALUES (?,?, ?, ? ,?)",
//     [title, author, genre, description, status],

//     (error, result, field) => {
//       if (error) {
//         res.status(404).json({ message: error.sqlMessage });
//       } else {
//         res.status(201).json({ message: "Book inserted" });
//       }
//     }
//   );
// }

// export async function updateBook(req, res) {
//   let bookId = Number(req.params.id);
//   db.query(
//     `UPDATE books SET title=?, author=?, genre=?, description=? ,status=? where book_id=${bookId};`,
//     [
//       req.body.title,
//       req.body.author,
//       req.body.genre,
//       req.body.description,
//       req.body.status,
//     ],
//     (err, student) => {
//       if (err) {
//         console.error("Error updating student:", err);
//         res
//           .status(500)
//           .json({ message: "An error occurred while updating the student." });
//       } else {
//         res.json({ message: "Book has been updated" });
//       }
//     }
//   );
// }

// export const catagorizeBooks = async (req, res) => {
//   db.query(
//     `SELECT genre, COUNT(*) AS book_count FROM books GROUP BY genre ORDER BY book_count DESC;`,
//     (error, result) => {
//       if (error) {
//         res.status(404).json({ message: error.sqlMessage });
//       } else {
//         res.status(200).json(result);
//       }
//     }
//   );
// };

export async function getBooks(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let order = "ASC";

    // Handling sorting and querying
    try {
      const result = await client.query(
        `SELECT * FROM books ORDER BY ${fieldName} ${order}`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.search) {
    const searchValue = req.query.search;

    try {
      const result = await client.query(
        `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1;`,
        [`%${searchValue}%`] // Parameterized query
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const result = await client.query("SELECT * FROM books");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export const getBooksInfo = async (req, res) => {
  const idToShow = req.params.id;

  try {
    const result = await client.query(
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
    await client.query("BEGIN"); // Start transaction

    // Deleting the book
    const deleteResult = await client.query(
      "DELETE FROM books WHERE book_id = $1 RETURNING *",
      [idToDelete]
    );

    // If the book doesn't exist
    if (deleteResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Book not found" });
    }

    // Check for existing loans
    const loanCheckResult = await client.query(
      "SELECT book_id FROM loans WHERE book_id = $1",
      [idToDelete]
    );

    if (loanCheckResult.rows.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Book is currently on loan" });
    }

    // Commit transaction
    await client.query("COMMIT");
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ message: "Error deleting book", error });
  }
}

export async function getBooksToLoan(req, res) {
  try {
    const result = await client.query(
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
    await client.query(
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
    const result = await client.query(
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
    const result = await client.query(
      "SELECT genre, COUNT(*) AS book_count FROM books GROUP BY genre ORDER BY book_count DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
