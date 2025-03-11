import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export const LoanForm = ({ onSubmitLoan, onUpdateBookStatus }) => {
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

  const [books, setBooks] = useState([]); // Data from database

  const [users, setUsers] = useState([]); // Data from database

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
  const baseURL = "http://localhost:3000";
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
    onSubmitLoan(newTransaction);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Issue loan</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            Add Loan
          </div>

          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  User name
                  <select
                    name="user_id"
                    onChange={handleChange}
                    value={Number(formFields.user_id)}
                    required
                    placeholder="Search..."
                    style={{
                      width: "250px",
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
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Book title
                  <select
                    name="book_id"
                    onChange={handleChange}
                    value={formFields.book_id}
                    placeholder="Search..."
                    style={{
                      width: "250px",
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
              <p style={{ position: "relative", width: "250px" }}>
                <label>
                  Loan date
                  <input
                    type="date"
                    name="loan_date"
                    value={formFields.loan_date}
                    onChange={handleChange}
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
                  Return date
                  <input
                    type="date"
                    name="return_date"
                    value={formFields.return_date}
                    onChange={handleChange}
                    style={{
                      width: "250px",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    required
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
                    required
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>
              </p>
              <div style={{ position: "relative", width: "250px" }}>
                <Button variant="contained" type="submit">
                  Loan
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
