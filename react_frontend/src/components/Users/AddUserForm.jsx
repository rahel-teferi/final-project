import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";

export const AddUserForm = ({ onSubmitUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
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

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = {
      name: formFields.name,
      email: formFields.email,
      password: formFields.password,
      role: formFields.role,
    };
    handleClose();
    onSubmitUser(newUser);
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
            New user
          </div>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  User name
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    value={formFields.name}
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Email
                  <input
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="email"
                    value={formFields.email}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Password
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="password"
                    value={formFields.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Role
                  <select
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    value={formFields.role}
                    name="role"
                    onChange={handleChange}
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <Button variant="contained" type="submit">
                  Add user
                </Button>
              </p>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
