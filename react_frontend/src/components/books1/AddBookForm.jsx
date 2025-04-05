import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { blueGrey } from "@mui/material/colors";

export const AddBookForm = ({ onSubmitBook, cleanForm }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formFields, setFormFields] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    status: "available",
  });
  useEffect(() => {
    if (cleanForm) {
      setFormFields({
        title: "",
        author: "",
        genre: "",
        description: "",
        status: "available",
      });
    }
  }, [cleanForm]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newBook = {
      title: formFields.title,
      author: formFields.author,
      genre: formFields.genre,
      description: formFields.description,
      status: formFields.status,
    };
    handleClose();
    onSubmitBook(newBook);
    cleanForm(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>Add a book</Button>
      <Modal
        style={{ backgroundColor: "rgb(255, 255, 255, 0.8" }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ width: "100%", m: "auto", textAlign: "center" }}
            id="customized-dialog-title"
          >
            New Book
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
            <form onSubmit={handleSubmit}>
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
                    value={formFields.title}
                    onChange={handleChange}
                    required
                  />
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
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
                    value={formFields.author}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
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
                    value={formFields.genre}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
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
                    value={formFields.description}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
                  Status
                  <select
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    value={formFields.status}
                    name="status"
                    onChange={handleChange}
                  >
                    <option
                      style={{
                        color: "black",
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                      value="available"
                    >
                      Available
                    </option>
                    <option
                      style={{
                        color: "black",
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                      value="loaned"
                    >
                      Loaned
                    </option>
                  </select>
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </p>
            </form>
          </DialogContent>
        </Box>
      </Modal>
    </>
  );
};
