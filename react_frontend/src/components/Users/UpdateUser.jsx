import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export const UpdateUser = ({ data, onUpdateUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    user_id: data.user_id,
    user_name: data.user_name,
    email: data.email,
    password: data.password,
    role: data.role,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let updatedUser = {
      user_name: values.user_name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    onUpdateUser(updatedUser, data.user_id);
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
                  User name
                  <input
                    type="text"
                    name="user_name"
                    value={values.user_name}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Email
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Password
                  <input
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </label>
              </p>

              <p>
                <label>
                  Role
                  <select
                    value={values.role}
                    name="role"
                    onChange={handleChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
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
