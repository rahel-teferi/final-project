import { db } from "../server.js";

export async function getBooks(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
      db.query(
        `select * from books ORDER BY ${fieldName} ${sortingOrder}`,
        (error, result, fields) => {
          res.status(200).json(result);
        }
      );
    }
  } else if (req.query.title) {
    let searchValue = req.query.title;
    db.query(
      "SELECT * FROM books WHERE title=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else if (req.query.author) {
    let searchValue = req.query.author;
    db.query(
      "SELECT * FROM students WHERE author=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else {
    db.query("select * from books ORDER BY title", (error, result, fields) => {
      res.status(200).json(result);
    });
  }
}

export const getBooksInfo = async (req, res) => {
  let idToShow = Number(req.params.id);
  db.query(
    `select * from books where book_id=${idToShow} `,
    (error, result, fields) => {
      //res.status(200).json(result[0]);
      // console.log(result[0]); //this will return the first element of the array
      res.status(200).json(result);
      console.log(result);
    }
  );
};

export async function deleteStudent(req, res) {
  let idToDelete = Number(req.params.id);
  db.beginTransaction((err) => {
    db.query(
      "DELETE  FROM books WHERE book_id = ?",
      [idToDelete],
      (error, result, fields) => {
        if (error) {
          return db.rollback(() => {
            res.status(500).json({ error: "Book Deletion failed" });
          });
        }
        db.query(
          "DELETE FROM loans where book_id=?",
          [idToDelete],
          (err, result) => {
            if (err || result.affectedRows === 0) {
              return db.rollback(() => {
                res.status(400).json({ error: "Book Deletion failed" });
              });
            }

            // Commit transaction if both queries succeed
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ error: "loan commit failed" });
                });
              }

              res.status(201).json({
                message: "Deletion successfull",
              });
            });
          }
        );
      }
    );
  });
}

export async function getBooksToLoan(req, res) {
  db.query(
    "SELECT book_id, title, status FROM books WHERE status='available' ORDER BY title",
    (error, result) => {
      if (error) {
        res.status(404).json({ message: error.sqlMessage });
      } else {
        res.status(200).json(result);
      }
    }
  );
}

export async function addBooks(req, res) {
  const { title, author, genre, description, status } = req.body;

  db.query(
    "INSERT INTO books (title, author, genre, description, status) VALUES (?,?, ?, ? ,?)",
    [title, author, genre, description, status],

    (error, result, field) => {
      if (error) {
        res.status(404).json({ message: error.sqlMessage });
      } else {
        res.status(201).json({ message: "Book inserted" });
      }
    }
  );
}

export async function updateBook(req, res) {
  let bookId = Number(req.params.id);
  db.query(
    `UPDATE books SET title=?, author=?, genre=?, description=? ,status=? where book_id=${bookId};`,
    [
      req.body.title,
      req.body.author,
      req.body.genre,
      req.body.description,
      req.body.status,
    ],
    (err, student) => {
      if (err) {
        console.error("Error updating student:", err);
        res
          .status(500)
          .json({ message: "An error occurred while updating the student." });
      } else {
        res.json({ message: "Book has been updated" });
      }
    }
  );
}
