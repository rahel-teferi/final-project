import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export const UpdateBook = ({ data, onUpdateBook }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    book_id: data.book_id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    description: data.description,
    book_status: data.book_status,
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
      book_status: values.book_status,
    };
    onUpdateBook(updatedBook, values.book_id);
  };

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

  return (
    <>
      <Button onClick={handleOpen}>Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleEdit}>
              <p>
                <label>
                  Book title
                  <input
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
                    value={values.book_status}
                    name="book_status"
                    onChange={handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Borrowed">Borrowed</option>
                  </select>
                </label>
              </p>

              <p>
                <button type="submit">update</button>
              </p>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
