import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const LoanForm = ({ onSubmitLoan }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  const [books, setBooks] = useState([]); // Data from database

  const [users, setUsers] = useState([]); // Data from database
  const [cleanForm, setCleanForm] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formFields, setFormFields] = useState({
    user_id: "",
    book_id: "",
    loan_date: "",
    return_date: "",
    is_returned: "",
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
  const baseURL = "https://library-management-system-4x5p.onrender.com";
  const handleChange = (e, i) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });

    console.log(formFields);
  };

  const getBooksToSearch = async () => {
    try {
      const response = await fetch(`${baseURL}/books/loans`);
      if (!response.ok) {
        throw new Error("not found");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBooksToSearch(books);
  }, []);

  function getUsersToSearch() {
    fetch(`${baseURL}/users`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getUsersToSearch(users);
  }, []);

  const handleSubmit = async () => {
    let newTransaction = {
      user_id: formFields.user_id,
      book_id: formFields.book_id,
      loan_date: formFields.loan_date,
      return_date: formFields.return_date,
      is_returned: formFields.is_returned,
    };
    handleClose();
    setCleanForm(true);
    onSubmitLoan(newTransaction);
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
    <div>
      <Button onClick={handleOpen}>Issue loan</Button>

      <Modal
        style={{ backgroundColor: "rgb(255, 255, 255, 0.8" }}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ width: "100%", m: "auto", p: 2, textAlign: "center" }}
            id="customized-dialog-title"
          >
            Issue Loan
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
                  User name
                  <select
                    name="user_id"
                    onChange={handleChange}
                    value={Number(formFields.user_id)}
                    required
                    placeholder="Search..."
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="">search</option>
                    {users.map((user) => (
                      <option key={user.user_id} value={user.user_id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
                  Book title
                  <select
                    name="book_id"
                    onChange={handleChange}
                    value={formFields.book_id}
                    placeholder="Search..."
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    required
                  >
                    <option value="">search</option>
                    {books.map((book) => (
                      <option key={book.book_id} value={book.book_id}>
                        {book.title}
                      </option>
                    ))}
                  </select>
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
                  Loan date
                  <input
                    type="date"
                    name="loan_date"
                    value={formFields.loan_date}
                    onChange={(e) => {
                      handleChange(e);
                      validateTime(e);
                    }}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
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
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    required
                  />
                </label>
              </p>
              <p>
                <label style={{ width: "100%" }}>
                  Returned
                  <select
                    value={formFields.is_returned}
                    name="is_returned"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>
              </p>
              <div style={{ position: "relative", width: "100%" }}>
                <Button variant="contained" type="submit">
                  Loan
                </Button>
              </div>
            </form>
          </DialogContent>
        </Box>
      </Modal>
    </div>
  );
};
