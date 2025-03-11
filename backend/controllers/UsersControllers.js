import bcrypt from "bcrypt";
import { db } from "../server.js";

export async function getUsers(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    let sortingOrder = "ASC";
    if (req.query.order) {
      sortingOrder = req.query.order;
      db.query(
        `SELECT * FROM users ORDER BY ${fieldName} ${sortingOrder}`,
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
  } else if (req.query.name) {
    let searchValue = req.query.name;
    db.query(
      "SELECT * FROM users WHERE name=?",
      [`${searchValue}`],
      (error, result, fields) => {
        console.log("searched");
        res.status(200).json(result);
      }
    );
  } else {
    db.query("SELECT * FROM users ORDER BY name", (error, result, fields) => {
      res.status(200).json(result);
    });
  }
}

export async function getUsersToLoan(req, res) {
  db.query(
    "SELECT user_id, name FROM users ORDER BY name",
    (error, result, fields) => {
      if (error) {
        res.status(404).json({ message: error.sqlMessage });
      } else {
        res.status(200).json(result);
      }
    }
  );
}

export async function getUsersInfo(req, res) {
  let idToShow = Number(req.params.id);
  db.query(
    `SELECT * FROM users WHERE user_id=${idToShow} `,
    (error, result, fields) => {
      if (error) {
        res.status(400).json(error);
      } else if (result) {
        res.status(200).json(result[0]);
        //this will return the first element of the array
      }
    }
  );
}

export async function deleteUser(req, res) {
  let idToDelete = Number(req.params.id);
  db.beginTransaction((err) => {
    db.query(
      "DELETE  FROM users WHERE user_id = ?",
      [idToDelete],
      (error, result, fields) => {
        if (error) {
          return db.rollback(() => {
            res.status(500).json({ error: "User Deletion failed" });
          });
        }
        db.query(
          "DELETE FROM loans where user_id=?",
          [idToDelete],
          (err, result) => {
            if (err || result.affectedRows === 0) {
              return db.rollback(() => {
                res.status(400).json({ error: "User Deletion failed" });
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

export async function addUser(req, res) {
  const { name, email, password, role } = req.body;
  const data = { ...req.body, password: await bcrypt.hash(password, 10) };
  if (!name || !email || !password || !role) {
    // console.log("All fields are required");
    return;
  } else {
    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?,?, ?, ? )",
      [data.name, data.email, data.password, data.role],

      (error, result, field) => {
        if (error) {
          res.status(404).json({ message: error.sqlMessage });
        } else {
          res.status(201).json({ message: "User inserted" });
        }
      }
    );
  }
}

export async function updateUser(req, res) {
  try {
    let userId = Number(req.params.id);
    db.query(
      `UPDATE users SET name=?, email=?, password=?, role=? WHERE user_id=${userId};`,
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

export async function login(req, res) {
  let { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email= ?",
    [email],
    async (error, result) => {
      if (error) {
        // display error
        res.status(500).json({ error: error });
      } else if (result) {
        if (result.length === 0) {
          res.status(200).json({ found: false });
        } else {
          const userPassword = result[0].password;
          const match = await bcrypt.compare(password, userPassword);
          if (!match) {
            res.status(200).json({ found: false });
          } else {
            res.status(200).json({ found: true, data: result[0] });
          }
        }
      }
    }
  );
}
