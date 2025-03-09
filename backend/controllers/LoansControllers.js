import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DataSQL",
  database: "library_managment_system",
});

export async function getLoans(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
      db.query(
        `SELECT * FROM loans ORDER BY ${fieldName} ${sortingOrder}`,
        (error, result, fields) => {
          res.status(200).json(result);
        }
      );
    }
  } else if (req.query.title) {
    let searchValue = req.query.title;
    db.query(
      "SELECT * FROM loans WHERE title=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else if (req.query.name) {
    let searchValue = req.query.name;
    db.query(
      "SELECT * FROM loans WHERE name=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else {
    db.query(
      `SELECT loans.*, users.name AS user, books.title AS book 
      FROM library_managment_system.loans 
      JOIN users USING(user_id) 
      JOIN books USING(book_id)`,
      (error, result, fields) => {
        res.status(200).json(result);
      }
    );
  }
}

export const getLoanInfo = async (req, res) => {
  let idToShow = Number(req.params.id);
  db.query(
    `SELECT * FROM loans where loan_id=${idToShow} `,
    (error, result, fields) => {
      res.status(200).json(result[0]);
      // console.log(result[0]); //this will return the first element of the array
      res.status(200).json(result);
      console.log(result);
    }
  );
};

export async function deleteLoan(req, res) {
  let idToDelete = Number(req.params.id);
  console.log(idToDelete);

  // validation
  if (typeof idToDelete !== "number") {
    res.status(404).json({ message: "book not found" });
  } else {
    // parametrized queries
    db.query(
      "DELETE  FROM loans where loan_id = ?",
      [idToDelete],
      (error, result, fields) => {
        res.status(200).json({ message: "Loanreturn deleted" });
      }
    );
  }
}

export async function updateStatus(req, res) {
  try {
    let books = Number(req.params.id);
    db.query(
      `UPDATE students SET name=?, email=?, password=?, role=? where user_id=books;`,
      [req.body.name, req.body.email, req.body.password, req.body.role],
      (err, student) => {
        res.json({ message: "User has been updated" });
      }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
}

// export async function addLoan(req, res) {
//   const reqBody = req.body;
//   console.log(reqBody);
// db.query(
//   "SELECT title, status FROM books WHERE book_id = ?",
//   [reqBody.book_id],
//   (err, SELECTedBook) => {
//     console.log(SELECTedBook[0].status);
//     if (SELECTedBook[0].status === "Loaned") {
//       let errMessage = `The book '${SELECTedBook.title}' is already loaned!`;
//       console.error(errMessage);
//       res.status(200).json({ error: errMessage });
//       return;
//     }
//   }
// );

//   db.query(
//     "INSERT INTO loans (user_id, book_id, loan_date, return_date) VALUES (?, ?, ?, ?) ",
//     [reqBody.user_id, reqBody.book_id, reqBody.loan_date, reqBody.return_date],
//     (err) => {
//       if (err) {
//         res.status(501).json({ error: err.message });
//         console.error(err.message);
//       } else {
//         res.status(201).json({ message: "Loan added for" });
//       }
//     }
//   );
// }
// export async function updateBookStatus(req, res) {
//   const reqBody = req.body;
//   db.query(
//     "UPDATE books SET status='loaned' where book_id=?",
//     [reqBody.book_id],
//     (err) => {
//       if (err) {
//         throw new Error(err);
//       } else {
//         res.status(200).json({ message: "Book updated" });
//       }
//     }
//   );
// }

export async function addLoan(req, res) {
  const { book_id, user_id, loan_date, return_date, status } = req.body;
  if (status === "loaned") {
    return res.status(400).json({ error: "Book already loaned" });
  } else {
    db.beginTransaction((err) => {
      const insertOrderQuery = `INSERT INTO loans (book_id, user_id, loan_date, return_date) VALUES (?, ?, ?,? )`;
      db.query(
        insertOrderQuery,
        [book_id, user_id, loan_date, return_date],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: "Loan failed" });
            });
          }
          const updateInventoryQuery = `UPDATE books SET status = 'loaned' WHERE book_id = ?`;
          db.query(updateInventoryQuery, [book_id], (err, updateResult) => {
            if (err || updateResult.affectedRows === 0) {
              return db.rollback(() => {
                res.status(400).json({ error: "Book  already loaned" });
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
                message: "Loan successfull",
              });
            });
          });
        }
      );
    });
  }
}
