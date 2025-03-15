import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { BookSearch } from "../components/books/BookSearch";
import { BookInfo } from "../components/books/BookInfo";
import { UserBooksTable } from "../components/books/UserBooksTable";

export const UserBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const [book, setBook] = useState([]);
  const baseURL = "http://localhost:3000";

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${baseURL}/books`);
      if (!response.ok) {
        throw error("not found");
      }
      const result = await response.json();
      setBooks(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks(books);
  }, []);

  const searchBook = async (searchValue) => {
    try {
      const response = await fetch(`${baseURL}/books?search=${searchValue}`);
      if (!response.ok) {
        throw new Error("not found");
      }
      const result = await response.json();
      setBooks(result);
      console.log(books);
    } catch (error) {
      console.log(error);
    }
  };

  const getBookInfo = async (id) => {
    try {
      const response = await fetch(`${baseURL}/books/${id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("not found");
      }
      const data = await response.json();
      setBook(data[0]);
      setOpen(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortBook = async (sortingColumn, order) => {
    if (order == "asc") {
      order = "desc";
    } else if (order == "desc") {
      order = "ASC";
    }
    try {
      const response = await fetch(
        `${baseURL}/books?sort=${sortingColumn}&order=${order}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("not found");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      {isLoading && (
        <section className="loader">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
      )}
      <h1 sx={{ padding: "0 50px" }}>List of books</h1>

      <p sx={{ padding: "0 50px" }}>
        <BookSearch onSearch={searchBook} />
      </p>

      {books.length !== 0 ? (
        <div sx={{ padding: "0 50px" }}>
          <UserBooksTable
            books={books}
            book={book}
            onBookInfo={getBookInfo}
            onSorting={sortBook}
          />
        </div>
      ) : (
        <p>There are no Books</p>
      )}
      <BookInfo book={book} open={open} setOpen={setOpen} />
    </div>
  );
};
