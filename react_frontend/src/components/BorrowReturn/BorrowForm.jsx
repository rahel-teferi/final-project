import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

export const BorrowForm = ({ onSubmitBorrow }) => {
  const [books, setBooks] = useState([]); // Data from database
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered results
  const [inputBookValue, setBookInputValue] = useState(""); // Input field value
  const [showBookDropdown, setBookShowDropdown] = useState(false);

  const [users, setUsers] = useState([]); // Data from database
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered results
  const [inputUserValue, setUserInputValue] = useState(""); // Input field value
  const [showUserDropdown, setUserShowDropdown] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formFields, setFormFields] = useState({
    user_id: inputBookValue,
    book_id: inputUserValue,
    borrowed_date: "",
    return_date: "",
    status: "",
  });

  function getBooksToSearch() {
    fetch("http://localhost:3000/borrow/bookId")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        //setFilteredBooks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getBooksToSearch();
  }, []);

  function getUsersToSearch() {
    fetch("http://localhost:3000/borrow/userId")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        //setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    getUsersToSearch();
  }, []);

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
  const handleBookInputChange = (event) => {
    const value = event.target.value;
    setBookInputValue(value);
    setBookShowDropdown(true);

    // Filter items based on input
    const filtered = books.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleBookSelect = (id) => {
    setBookInputValue(id);
    setFormFields({ ...formFields, book_id: id });
    setBookShowDropdown(false);
  };

  const handleUserInputChange = (event) => {
    const value = event.target.value;
    setUserInputValue(value);
    setUserShowDropdown(true);

    // Filter items based on input
    const filteredUsers = users.filter((item) =>
      item.user_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };
  const handleUserSelect = (id) => {
    setUserInputValue(id);
    setFormFields({ ...formFields, user_id: id });
    setUserShowDropdown(false);
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };
  const handleSubmit = async () => {
    let newTransaction = {
      user_id: formFields.user_id,
      book_id: formFields.book_id,
      borrowed_date: formFields.borrowed_date,
      return_date: formFields.return_date,
      status: formFields.status,
    };

    onSubmitBorrow(newTransaction);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Issue borrow</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div id="modal-modal-title" variant="h6" component="h2">
            Add a transaction
          </div>

          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ position: "relative", width: "250px" }}>
                <label>
                  User
                  <input
                    type="text"
                    value={inputUserValue}
                    onChange={handleUserInputChange}
                    onFocus={() => setUserShowDropdown(true)}
                    placeholder="Search..."
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>

                {showUserDropdown && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "5px 0 0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      position: "absolute",
                      width: "100%",
                      backgroundColor: "white",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 10,
                      color: "red",
                    }}
                  >
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((item) => (
                        <li
                          key={item.user_id}
                          onClick={() => handleUserSelect(item.user_id)}
                          style={{
                            color: "black",
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                          }}
                          onMouseDown={(e) => e.preventDefault()} // Prevent input from losing focus
                        >
                          {item.user_name}
                        </li>
                      ))
                    ) : (
                      <li style={{ padding: "8px", color: "gray" }}>
                        No results found
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div style={{ position: "relative", width: "250px" }}>
                <label>
                  Book
                  <input
                    type="text"
                    value={inputBookValue}
                    onChange={handleBookInputChange}
                    onFocus={() => setBookShowDropdown(true)}
                    placeholder="Search..."
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </label>

                {showBookDropdown && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                      margin: "5px 0 0",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      position: "absolute",
                      width: "100%",
                      backgroundColor: "white",
                      maxHeight: "150px",
                      overflowY: "auto",
                      zIndex: 10,
                      color: "red",
                    }}
                  >
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((item) => (
                        <li
                          key={item.book_id}
                          onClick={() => handleBookSelect(item.book_id)}
                          style={{
                            color: "black",
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                          }}
                          onMouseDown={(e) => e.preventDefault()} // Prevent input from losing focus
                        >
                          {item.title}
                        </li>
                      ))
                    ) : (
                      <li style={{ padding: "8px", color: "gray" }}>
                        No results found
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div>
                <label>
                  Borrow date
                  <input
                    type="date"
                    name="borrowed_date"
                    value={formFields.borrowed_date}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Return date
                  <input
                    type="date"
                    name="return_date"
                    value={formFields.return_date}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Status
                  <select
                    value={formFields.status}
                    name="status"
                    onChange={handleChange}
                  >
                    <option value="Borrowed">Borrowed</option>
                    <option value="Returned">Returned</option>
                  </select>
                </label>
              </div>
              <div>
                <button type="submit">Add Transaction</button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
