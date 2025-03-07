import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DataSQL",
  database: "library_managment_system",
});

export async function getBorrowReturns(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
      db.query(
        `select * from borrowreturn ORDER BY ${fieldName} ${sortingOrder}`,
        (error, result, fields) => {
          res.status(200).json(result);
        }
      );
    }
  } else if (req.query.title) {
    let searchValue = req.query.title;
    db.query(
      "SELECT * FROM borrowreturn WHERE title=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else if (req.query.user_name) {
    let searchValue = req.query.user_name;
    db.query(
      "SELECT * FROM borrowreturn WHERE user_name=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else {
    db.query("select * from borrowreturn", (error, result, fields) => {
      res.status(200).json(result);
    });
  }
}

export const getBorrowReturnInfo = async (req, res) => {
  let idToShow = Number(req.params.id);
  db.query(
    `select * from borrowreturn where borrow_return_id=${idToShow} `,
    (error, result, fields) => {
      res.status(200).json(result[0]);
      // console.log(result[0]); //this will return the first element of the array
      res.status(200).json(result);
      console.log(result);
    }
  );
};

export async function deleteBorrowReturn(req, res) {
  let idToDelete = Number(req.params.id);
  console.log(idToDelete);

  // validation
  if (typeof idToDelete !== "number") {
    res.status(404).json({ message: "book not found" });
  } else {
    // parametrized queries
    db.query(
      "DELETE  FROM borrowreturn where borrow_return_id = ?",
      [idToDelete],
      (error, result, fields) => {
        res.status(200).json({ message: "Borrowreturn deleted" });
      }
    );
  }
}

export async function addBorrowReturn(req, res) {
  const reqBody = req.body;

  db.query(
    "INSERT INTO borrowreturn (user_id, book_id, borrowed_date, return_date, status) VALUES (?,?, ?, ? ,?)",
    [
      reqBody.user_id,
      reqBody.book_id,
      reqBody.borrowed_date,
      reqBody.return_date,
      reqBody.status,
    ],

    (error, result, field) => {
      if (error) {
        res.status(404).json({ message: error.sqlMessage });
      } else {
        console.log(result);
        res.status(201).json({ message: "Book borrowed" });
      }
    }
  );
}

export async function updateStatus(req, res) {
  try {
    let bookId = Number(req.params.id);
    db.query(
      `UPDATE students SET user_name=?, email=?, password=?, role=? where user_id=?;`,
      [req.body.user_name, req.body.email, req.body.password, req.body.role],
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
