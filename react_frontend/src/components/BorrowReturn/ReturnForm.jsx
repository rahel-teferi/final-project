import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";

export const ReturnForm = ({ onSubmitBook }) => {
  const [formFields, setFormFields] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    Status: "",
  });
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddBook = async () => {
    // let newBook = {
    //   student_first_name: formFields.fname,
    //   student_last_name: formFields.lname,
    //   email: formFields.email,
    //   gender: formFields.gender,
    //   gender_other: formFields.genderOther,
    //   password: formFields.password,
    // };
    // onSubmitBook(newBook);
    console.log("success");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Issue Return</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            Add a new user
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
              <p>
                <label>
                  user Id
                  <input type="text" />
                </label>
              </p>
              <p>
                <label>
                  User name
                  <input type="text" />
                </label>
              </p>
              <p>
                <label>
                  Email
                  <input type="text" />
                </label>
              </p>
              <p>
                <label>
                  Password
                  <input type="text" />
                </label>
              </p>
              <p>
                <label>
                  Role
                  <input type="text" />
                </label>
              </p>
              <p>
                <button type="submit" onClick={handleAddBook}>
                  Add user
                </button>
              </p>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
