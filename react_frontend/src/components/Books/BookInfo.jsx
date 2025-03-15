import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const BookInfo = ({ book, open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid grey",
    boxShadow: 24,
  };
  // const imgSrc = URL.createObjectURL(book.image);
  return (
    <div>
      <Modal
        style={{ backgroundColor: "rgb(255, 255, 255, 0.8" }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ width: "100%", m: "auto", p: 2, textAlign: "center" }}
            id="customized-dialog-title"
          >
            {book.title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers
            style={{
              margin: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              style={{
                width: "100%",
                margin: "auto",
                maxWidth: "800px",
              }}
            />
            <img
              src="/bookcover.png"
              style={{
                width: "100%",
                margin: "auto",
                maxWidth: "800px",
              }}
            />

            <p>id: {book.book_id}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Description: {book.description}</p>
            <p>Status: {book.status}</p>
          </DialogContent>
        </Box>
      </Modal>
    </div>
  );
};
