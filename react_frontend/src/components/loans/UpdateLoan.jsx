import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";

export const UpdateLoan = ({ data, onUpdateLoan }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formFields, setFormFields] = useState({
    loan_id: data.loan_id,
    user_id: data.user_id,
    book_id: data.book_id,
    loan_date: data.loan_date,
    return_date: data.return_date,
    is_returned: data.is_returned,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let updatedLoan = {
      loan_id: data.loan_id,
      user_id: data.user_id,
      book_id: data.book_id,
      loan_date: data.loan_date,
      return_date: formFields.return_date,
      is_returned: formFields.is_returned,
    };
    handleClose();
    onUpdateLoan(updatedLoan, data.loan_id);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };
  const validateTime = async (e) => {
    let selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (selectedDate < currentDate) {
      alert("The Date can not be in the past");
      e.target.value = "";
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Return</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ width: "100%", m: "auto", textAlign: "center" }}
            id="customized-dialog-title"
          >
            Update Loan
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
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  User
                  <select
                    name="user_id"
                    onChange={handleChange}
                    value={Number(data.user_id)}
                    required
                    placeholder="Search..."
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    disabled
                  >
                    <option key={data.user_id} value={data.user_id}>
                      {data.user}
                    </option>
                  </select>
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Book
                  <select
                    name="book_id"
                    value={data.book_id}
                    placeholder="Search..."
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    disabled
                  >
                    <option key={data.book_id} value={data.book_id}>
                      {data.book}
                    </option>
                  </select>
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Loan date
                  <input
                    type="date"
                    name="loan_date"
                    value={data.loan_date}
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    disabled
                  />
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Return date
                  <input
                    type="date"
                    name="return_date"
                    value={formFields.return_date}
                    onChange={(e) => {
                      handleChange(e);
                      validateTime(e);
                    }}
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>
              </p>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Returned
                  <select
                    value={formFields.is_returned}
                    name="is_returned"
                    onChange={handleChange}
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option
                      style={{
                        color: "black",
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                      value="No"
                    >
                      No
                    </option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>
              </p>
              <div style={{ position: "relative", width: "250px" }}>
                <Button variant="contained" type="submit">
                  Update
                </Button>
              </div>
            </form>
          </DialogContent>
        </Box>
      </Modal>
    </>
  );
};
