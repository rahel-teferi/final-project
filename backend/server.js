import express from "express";
import mysql from "mysql2";
import cors from "cors";
import * as BooksControllers from "./controllers/BooksControllers.js";
import * as UsersControllers from "./controllers/UsersControllers.js";
import * as LoansControllers from "./controllers/LoansControllers.js";
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "*" }));
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "DataSQL",
});

app.get("/books", BooksControllers.getBooks);
app.get("/loans/books", BooksControllers.getBooksToLoan);
app.get("/books/:id", BooksControllers.getBooksInfo);
app.put("/books/:id", BooksControllers.updateBook);
app.delete("/books/:id", BooksControllers.deleteStudent);
app.post("/books", BooksControllers.addBooks);

app.get("/users", UsersControllers.getUsers);
app.get("/loans/users", UsersControllers.getUsersToLoan);
app.get("/users/:id", UsersControllers.getUsersInfo);
app.put("/users/:id", UsersControllers.updateUser);
app.delete("/users/:id", UsersControllers.deleteUser);
app.post("/user", UsersControllers.addUser);

app.get("/loans", LoansControllers.getLoans);
app.get("/loans/:id", LoansControllers.getLoanInfo);
app.put("/loans/:id", LoansControllers.updateStatus);
// app.put("/loans/book/:id", LoansControllers.updateBookStatus);
app.delete("/loans/:id", LoansControllers.deleteLoan);
app.post("/loans", LoansControllers.addLoan);

//error route
app.use((req, res, next) => {
  res.status(404).send("wrong route");
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
