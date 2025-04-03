import { db } from "../server.js";

export async function getLoans(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
      db.query(
        `SELECT * FROM loans ORDER BY ${fieldName} ${sortingOrder}`,
        (error, result) => {
          res.status(200).json(result);
        }
      );
    }
  } else if (req.query.search) {
    let searchValue = req.query.search;
    db.query(
      `SELECT loans.*, users.name AS user, books.title AS book 
      FROM loans 
      JOIN users USING(user_id) 
      JOIN books USING(book_id) WHERE books.title like '%${searchValue}%' OR users.name like '%${searchValue}%';`,
      [],
      (error, result) => {
        if (error) {
          throw new Error(error);
        }
        res.status(200).json(result);
      }
    );
  } else {
    db.query(
      `SELECT loans.*, users.name AS user, books.title AS book 
      FROM library_managment_system.loans 
      JOIN users USING(user_id) 
      JOIN books USING(book_id)`,
      (error, result) => {
        res.status(200).json(result);
      }
    );
  }
}

export async function getBooksLoaned(req, res) {
  let userId = Number(req.params.id);

  db.query(
    `SELECT loans.*, users.name AS user, books.title AS book 
      FROM library_managment_system.loans 
      JOIN users USING(user_id) 
      JOIN books USING(book_id) WHERE user_id = ?; `,
    [userId],
    (error, result) => {
      if (error) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(200).json(result);
      }
    }
  );
}

export const getLoanInfo = async (req, res) => {
  let idToShow = Number(req.params.id);
  db.query(
    `SELECT * FROM loans where loan_id=${idToShow} `,
    (error, result) => {
      res.status(200).json(result[0]);

      res.status(200).json(result);
    }
  );
};

export async function deleteLoan(req, res) {
  let idToDelete = Number(req.params.id);

  // validation
  if (typeof idToDelete !== "number") {
    res.status(404).json({ message: "book not found" });
  } else {
    // parametrized queries
    db.query(
      "DELETE  FROM loans where loan_id = ?",
      [idToDelete],
      (error, result) => {
        res.status(200).json({ message: "Loanreturn deleted" });
      }
    );
  }
}

export async function addLoan(req, res) {
  const { book_id, user_id, loan_date, return_date, status } = req.body;
  if (status === "loaned") {
    return res.status(400).json({ error: "Book already loaned" });
  } else {
    db.beginTransaction((err) => {
      db.query(
        `INSERT INTO loans (book_id, user_id, loan_date, return_date) VALUES (?, ?, ?,? )`,
        [book_id, user_id, loan_date, return_date],
        (err, result) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: "Loan failed" });
            });
          }
          db.query(
            `UPDATE books SET status = 'loaned' WHERE book_id = ?`,
            [book_id],
            (err, updateResult) => {
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
            }
          );
        }
      );
    });
  }
}

export async function updateLoan(req, res) {
  const { book_id, loan_id, return_date, is_returned } = req.body;
  db.beginTransaction((err) => {
    db.query(
      "UPDATE loans SET return_date=?, is_returned=? WHERE loan_id=?",
      [return_date, is_returned, loan_id],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: "Loan update failed" });
          });
        }
        db.query(
          `UPDATE books SET status = 'available' WHERE book_id = ?`,
          [book_id],
          (err, updateResult) => {
            if (err || updateResult.affectedRows === 0) {
              return db.rollback(() => {
                res.status(400).json({ error: err.sqlmessage });
              });
            }
            // Commit transaction if both queries succeed
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ error: "loan return failed" });
                });
              }

              res.status(200).json({
                message: "Update successfull",
              });
            });
          }
        );
      }
    );
  });
}

export async function extendLoan(req, res) {
  const loan_id = req.params.id;
  console.log(loan_id);
  db.query(
    `UPDATE loans SET return_date = DATE_ADD(return_date, INTERVAL 7 DAY), extenssion_count=extenssion_count+1 WHERE loan_id = ? `,
    [loan_id],
    (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({ error: "Loan update failed" });
      } else if (result) {
        console.log(result);
        res.status(200).json({ message: "Loan extended" });
      }
    }
  );
}
