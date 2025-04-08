import bcrypt from "bcrypt";

import { db } from "../server.js";

export async function getUsers(req, res) {
  if (req.query.sort) {
    const fieldName = req.query.sort;
    const order = "ASC";

    try {
      const result = await db.query(
        `SELECT * FROM users ORDER BY ${fieldName} ${order}`
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.id) {
    const searchValue = Number(req.query.id);
    try {
      const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
        searchValue,
      ]);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(400).json(error);
    }
  } else if (req.query.search) {
    const searchValue = req.query.search;
    try {
      const result = await db.query(
        `SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1`,
        [`%${searchValue}%`]
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      const result = await db.query("SELECT * FROM users ORDER BY name");
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export async function getUsersToLoan(req, res) {
  try {
    const result = await db.query(
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
    const result = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
      idToShow,
    ]);
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
    await db.query("BEGIN"); // Start transaction

    // Delete the user record
    const deleteResult = await db.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [idToDelete]
    );

    if (deleteResult.rows.length === 0) {
      await db.query("ROLLBACK");
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has any loans
    const loanCheck = await db.query(
      "SELECT user_id FROM loans WHERE user_id = $1",
      [idToDelete]
    );

    if (loanCheck.rows.length > 0) {
      await db.query("ROLLBACK");
      return res
        .status(400)
        .json({ error: "User cannot be deleted, active loans exist." });
    }

    // Commit the transaction if both queries succeed
    await db.query("COMMIT");
    res.status(200).json({ message: "User deletion successful" });
  } catch (error) {
    await db.query("ROLLBACK");
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
    const result = await db.query(
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

    const result = await db.query(
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
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
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
