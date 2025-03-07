import mysql from "mysql2";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DataSQL",
  database: "library_managment_system",
});

export async function getUsers(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
      db.query(
        `select * from users ORDER BY ${fieldName} ${sortingOrder}`,
        (error, result, fields) => {
          res.status(200).json(result);
        }
      );
    }
  } else if (req.query.id) {
    let searchValue = Number(req.query.id);
    db.query(
      "SELECT * FROM users WHERE user_id=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else if (req.query.user_name) {
    let searchValue = req.query.user_name;
    db.query(
      "SELECT * FROM users WHERE user_name=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else {
    db.query("select * from users", (error, result, fields) => {
      res.status(200).json(result);
    });
  }
}

export async function getUserToBorrow(req, res) {
  db.query("select user_id, user_name from users", (error, result, fields) => {
    if (error) {
      res.status(404).json({ message: error.sqlMessage });
    } else {
      res.status(200).json(result);
    }
  });
}

export async function getUsersInfo(req, res) {
  let idToShow = Number(req.params.id);
  db.query(
    `select * from users where user_id=${idToShow} `,
    (error, result, fields) => {
      res.status(200).json(result[0]);
      // console.log(result[0]); //this will return the first element of the array
      res.status(200).json(result);
      console.log(result);
    }
  );
}

export async function deleteUser(req, res) {
  let idToDelete = Number(req.params.id);
  console.log(idToDelete);

  // validation
  if (typeof idToDelete !== "number") {
    res.status(404).json({ message: "book not found" });
  } else {
    // parametrized queries
    db.query(
      "DELETE  FROM users where user_id = ?",
      [idToDelete],
      (error, result, fields) => {
        res.status(200).json({ message: "user deleted" });
      }
    );
  }
}

export async function addUser(req, res) {
  const reqBody = req.body;

  db.query(
    "INSERT INTO users (user_name, email, password, role) VALUES (?,?, ?, ? )",
    [reqBody.user_name, reqBody.email, reqBody.password, reqBody.role],

    (error, result, field) => {
      if (error) {
        res.status(404).json({ message: error.sqlMessage });
      } else {
        res.status(201).json({ message: "User inserted" });
      }
    }
  );
}

export async function updateUser(req, res) {
  try {
    let bookId = Number(req.params.id);
    db.query(
      `UPDATE users SET user_name=?, email=?, password=?, role=? where user_id=${bookId};`,
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

// export async function validateStudent(req, res) {
//   try {
//     let { email, password } = req.body;

//     const student = await Student.findOne({
//       where: {
//         email: email, //the first is the value from the DB
//       },
//     });

//     if (student.email === null) {
//       res.status(404).json({ error: "wrong credincial" });
//     } else {
//       //check the password
//       const match = await bcrypt.compare(password, student.password);
//       if (!match) {
//         res.status(401).json({ error: "wrong credincial" });
//       } else {
//         res.status(200).json({ message: "OK" });
//       }
//     }
//   } catch (error) {
//     console.log(`Error: ${error}`);
//     res.status(404).json({ error: error });
//   }
// }
