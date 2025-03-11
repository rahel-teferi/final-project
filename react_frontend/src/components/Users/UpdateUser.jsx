import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";

export const UpdateUser = ({ data, onUpdateUser }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState({
    user_id: data.user_id,
    name: data.name,
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
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    };
    setOpen(false);
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
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Email
                  <input
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
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
                    type="text"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </label>
              </p>

              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Role
                  <select
                    value={values.role}
                    name="role"
                    onChange={handleChange}
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                </label>
              </p>

              <p style={{ position: "relative", width: "250px" }}>
                <Button variant="contained" type="submit">
                  Update
                </Button>
              </p>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
};
