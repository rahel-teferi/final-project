import React from "react";
import { useState, useEffect } from "react";

import { BooksTable } from "../components/books/BooksTable";
import { AddBookForm } from "../components/books/AddBookForm";

export const Books = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [cleanForm, setCleanForm] = useState(false);
  const baseURL = "http://localhost:3000";

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

  const addBook = async (data) => {
    try {
      const response = await fetch(`${baseURL}/books`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 404) {
          console.log(response);
        } else {
          throw new Error("db problem");
        }
      }
      const result = await response.json();
      console.log(result);
      alert(result.message);
      await fetchBooks();
      setCleanForm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateBook = async (data, id) => {
    console.log(data);
    console.log(typeof id);
    try {
      const response = await fetch(`${baseURL}/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 404) {
          console.log(response);
        } else {
          throw new Error("db problem");
        }
      }
      const result = await response.json();
      console.log(result);
      alert(result.message);
      fetchBooks();
      setCleanForm(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBook = async (id, e) => {
    try {
      const response = await fetch(`${baseURL}/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("not found");
      }
      const result = await response.json();
      alert(result.message);
      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
      <h1>Books Managment</h1>
      <AddBookForm onSubmitBook={addBook} cleanForm={cleanForm} />
      <BooksTable
        onUpdateBook={onUpdateBook}
        onRowDelete={deleteBook}
        books={books}
      />
    </div>
  );
};
