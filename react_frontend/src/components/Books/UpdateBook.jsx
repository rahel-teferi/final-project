import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

export const UpdateBook = ({ e, data, onUpdateBook }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    book_id: data.book_id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    description: data.description,
    status: data.status,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let updatedBook = {
      title: values.title,
      author: values.author,
      genre: values.genre,
      description: values.description,
      status: values.status,
    };
    handleClose();
    onUpdateBook(updatedBook, values.book_id);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    maxWidth: 600,
  };

  return (
    <>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        style={{ backgroundColor: "rgb(255, 255, 255, 0.8" }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ m: "auto", textAlign: "center" }}
            id="customized-dialog-title"
          >
            Update Book
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
          <DialogContent dividers>
            <form onSubmit={handleEdit}>
              <p>
                <label style={{ width: "100%" }}>
                  Book title
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Book author
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Book genre
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    name="genre"
                    value={values.genre}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Description
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Status
                  <select
                    value={values.status}
                    name="status"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="available">Available</option>
                    <option value="loaned">Loaned</option>
                  </select>
                </label>
              </p>

              <p>
                <Button variant="contained" type="submit">
                  update
                </Button>
              </p>
            </form>
          </DialogContent>
        </Box>
      </Modal>
    </>
  );
};
