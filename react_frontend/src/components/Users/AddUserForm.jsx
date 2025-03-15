import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const AddUserForm = ({ onSubmitUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cleanForm, setCleanForm] = useState(false);
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
    width: 300,
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #grey",
    boxShadow: 24,
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
    setCleanForm(true);
    onSubmitUser(newUser);
  };

  return (
    <>
      <Button onClick={handleOpen}>Add a user</Button>
      <Modal
        style={{ backgroundColor: "rgb(255, 255, 255, 0.9" }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ width: "100%", m: "auto", textAlign: "center" }}
            id="customized-dialog-title"
          >
            New User
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
              <p>
                <label style={{ width: "100%" }}>
                  Email
                  <input
                    style={{
                      width: "100%",
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
              <p>
                <label style={{ width: "100%" }}>
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
              <p>
                <label style={{ width: "100%" }}>
                  Role
                  <select
                    style={{
                      width: "100%",
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
              <p>
                <Button variant="contained" type="submit">
                  Add user
                </Button>
              </p>
            </form>
          </DialogContent>
        </Box>
      </Modal>
    </>
  );
};
