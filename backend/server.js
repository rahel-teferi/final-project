import express from "express";
import mysql from "mysql2";
import cors from "cors";
import * as BooksControllers from "./controllers/BooksControllers.js";
import * as UsersControllers from "./controllers/UsersControllers.js";
import * as BorrowReturnsControllers from "./controllers/BorrowReturnsControllers.js";
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
app.get("/borrow/bookId", BooksControllers.getBookToBorrow);
app.get("/books/:id", BooksControllers.getBooksInfo);
app.put("/books/:id", BooksControllers.updateBook);
app.delete("/books/:id", BooksControllers.deleteStudent);
app.post("/books", BooksControllers.addBooks);

app.get("/users", UsersControllers.getUsers);
app.get("/borrow/userId", UsersControllers.getUserToBorrow);
app.get("/users/:id", UsersControllers.getUsersInfo);
app.put("/users/:id", UsersControllers.updateUser);
app.delete("/users/:id", UsersControllers.deleteUser);
app.post("/user", UsersControllers.addUser);

app.get("/borrowReturns", BorrowReturnsControllers.getBorrowReturns);
app.get("/borrowReturns/:id", BorrowReturnsControllers.getBorrowReturnInfo);
app.put("/borrowReturns/:id", BorrowReturnsControllers.updateStatus);
app.delete("/borrowReturns/:id", BorrowReturnsControllers.deleteBorrowReturn);
app.post("/borrowReturns", BorrowReturnsControllers.addBorrowReturn);

//error route
app.use((req, res, next) => {
  res.status(404).send("wrong route");
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
