import bcrypt from "bcrypt";
// import { db } from "../server.js";
import { client } from "../server.js";
// export async function getUsers(req, res) {
//   if (req.query.sort) {
//     const fieldName = req.query.sort;
//     let order = "ASC";
//     // if (req.query.order) {
//     //   sortingOrder = req.query.order;
//     db.query(
//       `SELECT * FROM users ORDER BY ${fieldName} ${order}`,
//       (error, result) => {
//         if (error) {
//           res.status(400).json(error);
//         }
//         res.status(200).json(result);
//       }
//     );
//   } else if (req.query.id) {
//     let searchValue = Number(req.query.id);
//     db.query(
//       "SELECT * FROM users WHERE user_id=?",
//       [`${searchValue}`],
//       (error, result) => {
//         console.log("searched");
//         res.status(200).json(result);
//       }
//     );
//   } else if (req.query.search) {
//     let searchValue = req.query.search;
//     db.query(
//       `SELECT * FROM users WHERE name like '%${searchValue}%' OR email like '%${searchValue}%';`,
//       [],
//       (error, result) => {
//         if (error) {
//           throw new Error(error);
//         }
//         res.status(200).json(result);
//       }
//     );
//   } else {
//     db.query("SELECT * FROM users ORDER BY name", (error, result) => {
//       res.status(200).json(result);
//     });
//   }
// }

// export async function getUsersToLoan(req, res) {
//   db.query("SELECT user_id, name FROM users ORDER BY name", (error, result) => {
//     if (error) {
//       res.status(404).json({ message: error.sqlMessage });
//     } else {
//       res.status(200).json(result);
//     }
//   });
// }

// export async function getUsersInfo(req, res) {
//   let idToShow = Number(req.params.id);
//   db.query(
//     `SELECT * FROM users WHERE user_id=${idToShow} `,
//     (error, result) => {
//       if (error) {
//         res.status(400).json(error);
//       } else if (result) {
//         res.status(200).json(result[0]);
//         //this will return the first element of the array
//       }
//     }
//   );
// }

// export async function deleteUser(req, res) {
//   let idToDelete = Number(req.params.id);

//   db.beginTransaction((err) => {
//     db.query(
//       "DELETE  FROM users WHERE user_id = ?",
//       [idToDelete],
//       (error, result) => {
//         if (error) {
//           return db.rollback(() => {
//             res.status(500).json({ error: "User Deletion failed" });
//           });
//         }
//         db.query(
//           "SELECT user_id FROM loans where user_id=?",
//           [idToDelete],
//           (err, result) => {
//             console.log(result);
//             if (result.length > 0) {
//               return db.rollback(() => {
//                 res.status(400).json({ error: "User can not be deleted" });
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

// export async function addUser(req, res) {
//   const { name, email, password, role } = req.body;
//   const data = { ...req.body, password: await bcrypt.hash(password, 10) };
//   if (!name || !email || !password || !role) {
//     // console.log("All fields are required");
//     return;
//   } else {
//     db.query(
//       "INSERT INTO users (name, email, password, role) VALUES (?,?, ?, ? )",
//       [data.name, data.email, data.password, data.role],

//       (error, result, field) => {
//         if (error) {
//           res.status(404).json({ message: error.sqlMessage });
//         } else {
//           res.status(201).json({ message: "User inserted" });
//         }
//       }
//     );
//   }
// }

// export async function updateUser(req, res) {
//   try {
//     let userId = Number(req.params.id);
//     db.query(
//       `UPDATE users SET name=?, email=?, password=?, role=? WHERE user_id=${userId};`,
//       [req.body.name, req.body.email, req.body.password, req.body.role],
//       (err, student) => {
//         res.json({ message: "User has been updated" });
//       }
//     );
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while updating the user." });
//   }
// }

// export async function login(req, res) {
//   let { email, password } = req.body;

//   db.query(
//     "SELECT * FROM users WHERE email= ?",
//     [email],
//     async (error, result) => {
//       if (error) {
//         // display error
//         res.status(500).json({ error: error });
//       } else if (result) {
//         if (result.length === 0) {
//           res.status(200).json({ found: false });
//         } else {
//           const userPassword = result[0].password;
//           const match = await bcrypt.compare(password, userPassword);
//           if (!match) {
//             res.status(200).json({ found: false });
//           } else {
//             res.status(200).json({ found: true, data: result[0] });
//           }
//         }
//       }
//     }
//   );
// }

export async function getUsers(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    const order = "ASC";

    try {
      const result = await client.query(
        `SELECT * FROM users ORDER BY ${fieldName} ${order}`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.id) {
    const searchValue = Number(req.query.id);
    try {
      const result = await client.query(
        "SELECT * FROM users WHERE user_id = $1",
        [searchValue]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.search) {
    const searchValue = req.query.search;
    try {
      const result = await client.query(
        `SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1`,
        [`%${searchValue}%`]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const result = await client.query("SELECT * FROM users ORDER BY name");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export async function getUsersToLoan(req, res) {
  try {
    const result = await client.query(
      "SELECT user_id, name FROM users ORDER BY name"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getUsersInfo(req, res) {
  const idToShow = Number(req.params.id);

  try {
    const result = await client.query(
      `SELECT * FROM users WHERE user_id = $1`,
      [idToShow]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteUser(req, res) {
  const idToDelete = Number(req.params.id);

  try {
    await client.query("BEGIN"); // Start transaction

    // Delete the user record
    const deleteResult = await client.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [idToDelete]
    );

    if (deleteResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has any loans
    const loanCheck = await client.query(
      "SELECT user_id FROM loans WHERE user_id = $1",
      [idToDelete]
    );

    if (loanCheck.rows.length > 0) {
      await client.query("ROLLBACK");
      return res
        .status(400)
        .json({ error: "User cannot be deleted, active loans exist." });
    }

    // Commit the transaction if both queries succeed
    await client.query("COMMIT");
    res.status(200).json({ message: "User deletion successful" });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Error deleting user", details: error });
  }
}

export async function addUser(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING user_id",
      [name, email, hashedPassword, role]
    );
    res
      .status(201)
      .json({ message: "User added", user_id: result.rows[0].user_id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function updateUser(req, res) {
  const { name, email, password, role } = req.body;
  const userId = Number(req.params.id);

  try {
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const result = await client.query(
      `UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE user_id = $5 RETURNING *`,
      [name, email, updatedPassword || password, role, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", details: error });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(200).json({ found: false });
    }

    const userPassword = result.rows[0].password;
    const match = await bcrypt.compare(password, userPassword);

    if (!match) {
      return res.status(200).json({ found: false });
    }

    res.status(200).json({ found: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error during login", details: error });
  }
}
