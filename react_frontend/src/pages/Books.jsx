import React from "react";
import { useState, useEffect } from "react";
import { Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BooksTable } from "../components/books/BooksTable";
import { AddBookForm } from "../components/books/AddBookForm";
import { BookSearch } from "../components/books/BookSearch";
import { BookInfo } from "../components/books/BookInfo";

export const Books = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [cleanForm, setCleanForm] = useState(false);
  const [book, setBook] = useState([]);
  const baseURL = "http://localhost:3000";

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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
          throw new Error(error);
        } else {
          throw new Error("db problem");
        }
      }
      const result = await response.json();
      setMessage(result.message);
      openModal();
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

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(error);
        } else {
          throw new Error("db problem");
        }
      }
      const result = await response.json();
      setMessage(result.message);
      openModal();
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
        alert(
          "This Book can not be deleted because it has entries in other tables"
        );
      } else {
        const result = await response.json();
        setMessage(result.message);
        openModal();
        fetchBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      if (!response.ok) {
        throw new Error("not found");
      }
      const data = await response.json();
      setBook(data[0]);
      handleOpen();
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
      <h1 style={{ padding: "0 50px" }}>Books Managment</h1>
      <p style={{ padding: "0 50px" }}>
        <AddBookForm onSubmitBook={addBook} cleanForm={cleanForm} />
      </p>
      <p style={{ padding: "0 50px" }}>
        <BookSearch onSearch={searchBook} />
      </p>
      {books.length !== 0 ? (
        <BooksTable
          onUpdateBook={onUpdateBook}
          onRowDelete={deleteBook}
          books={books}
          // book={book}
          onBookInfo={getBookInfo}
          onSorting={sortBook}
        />
      ) : (
        <p>There are no Books</p>
      )}
      <BookInfo book={book} open={open} setOpen={setOpen} />
      {modalIsOpen && (
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              height: 200,
              backgroundColor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 6,
            }}
          >
            <Button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                alignContent: "right",
              }}
            >
              close
            </Button>
            <br />
            <Typography id="modal-modal-description" sx={{ p: 6 }}>
              {message}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};
