import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DataSQL",
  database: "library_managment_system",
});

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
    db.query("select * from books", (error, result, fields) => {
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
  console.log(idToDelete);
  console.log(req.method);
  // validation
  if (typeof idToDelete !== "number") {
    res.status(404).json({ message: "book not found" });
  } else {
    // parametrized queries
    db.query(
      "DELETE  FROM books where book_id = ?",
      [idToDelete],
      (error, result, fields) => {
        res.status(200).json({ message: "Book deleted" });
      }
    );
  }
}

export async function getBooksToLoan(req, res) {
  db.query(
    "SELECT book_id, title, status FROM books WHERE status='available' ",
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
  const reqBody = req.body;

  db.query(
    "INSERT INTO books (title, author, genre, description, status) VALUES (?,?, ?, ? ,?)",
    [
      reqBody.title,
      reqBody.author,
      reqBody.genre,
      reqBody.description,
      reqBody.status,
    ],

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
  try {
    let books = Number(req.params.id);
    db.query(
      `UPDATE books SET title=?, author=?, genre=?, description=? ,status=? where book_id=${books};`,
      [
        req.body.title,
        req.body.author,
        req.body.genre,
        req.body.description,
        req.body.status,
      ],
      (err, student) => {
        res.json({ message: "Book has been updated" });
      }
    );
  } catch (error) {
    console.error("Error updating student:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the student." });
  }
}
