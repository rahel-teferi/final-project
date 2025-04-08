import express from "express";
import cors from "cors";
import pg from "pg";
import * as BooksControllers from "./controllers/BooksControllers.js";
import * as UsersControllers from "./controllers/UsersControllers.js";
import * as LoansControllers from "./controllers/LoansControllers.js";
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: "*" }));
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "DataSQL",
//   database: "library_managment_system",
// });
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Needed for Render's PostgreSQL connection
  },
});

// Connect to PostgreSQL
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to the database", err));

const port = process.env.PORT || 3000;
app.get("/books", BooksControllers.getBooks);
app.get("/books/loans", BooksControllers.getBooksToLoan);
app.get("/books/:id", BooksControllers.getBooksInfo);
app.put("/books/:id", BooksControllers.updateBook);
app.delete("/books/:id", BooksControllers.deleteBook);
app.post("/books", BooksControllers.addBooks);
app.get("/catagories", BooksControllers.catagorizeBooks);

app.get("/users", UsersControllers.getUsers);
app.get("/loans/users", UsersControllers.getUsersToLoan);
app.get("/users/:id", UsersControllers.getUsersInfo);
app.put("/users/:id", UsersControllers.updateUser);
app.delete("/users/:id", UsersControllers.deleteUser);
app.post("/user", UsersControllers.addUser);

app.get("/loans", LoansControllers.getLoans);
app.get("/loans/:id", LoansControllers.getLoanInfo);
app.put("/loans/:id", LoansControllers.updateLoan);
app.delete("/loans/:id", LoansControllers.deleteLoan);
app.post("/loans", LoansControllers.addLoan);
app.get("/loans/users/:id", LoansControllers.getBooksLoaned);
app.get("/loans/extend/:id", LoansControllers.extendLoan);

app.post("/login", UsersControllers.login);

//error route
app.use((req, res, next) => {
  res.status(404).send("wrong route");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
