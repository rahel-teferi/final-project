import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const BookInfo = ({ book }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <p>id: {book.book_id}</p>
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Description: {book.description}</p>
          <p>Email: {book.status}</p>

          <p>
            Go back to the
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // navigate(-1);
                navigate(`/books`);
              }}
            >
              Book list
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // navigate(-1);
                navigate(`/books/${book.book_id - 1}`);
              }}
            >
              Prev
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // navigate(-1);
                navigate(`/books/${book.book_id + 1}`);
              }}
            >
              Next
            </a>
          </p>
        </div>
      </Box>
    </Modal>
  );
};
