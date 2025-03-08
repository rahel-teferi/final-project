import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export const AddUserForm = ({ onSubmitUser, cleanForm }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  // useEffect(() => {
  //   if (cleanForm) {
  //     setFormFields({
  //       fname: "",
  //       lname: "",
  //       email: "",
  //       birthdate: "",
  //       gender: "",
  //       genderOther: "",
  //       password: "",
  //       confirmPassword: "",
  //     });
  //   }
  // }, [cleanForm]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };
  const handleSubmit = async () => {
    let newUser = {
      name: formFields.name,
      email: formFields.email,
      password: formFields.password,
      role: formFields.role,
    };
    onSubmitUser(newUser);
    // cleanForm(true);
    console.log(newUser);
  };

  return (
    <>
      <Button onClick={handleOpen}>Add a user</Button>
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
                  User name
                  <input
                    type="text"
                    value={formFields.name}
                    name="name"
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Email
                  <input
                    type="text"
                    value={formFields.email}
                    name="email"
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Password
                  <input
                    type="text"
                    value={formFields.password}
                    name="password"
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Role
                  <select
                    value={formFields.role}
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                </label>
              </p>
              <p>
                <button onClick={handleSubmit}>Add user</button>
              </p>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
