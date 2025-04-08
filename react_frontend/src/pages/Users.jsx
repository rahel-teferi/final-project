import React from "react";
import { AddUserForm } from "../components/users/AddUserForm";
import { UsersTable } from "../components/users/UsersTable";
import { useState, useEffect } from "react";
import { UserSearch } from "../components/users/UserSearch";
import { Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cleanForm, setCleanForm] = useState(false);
  const [message, setMessage] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const baseURL = "https://library-management-system-4x5p.onrender.com";
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseURL}/users`);
      if (!response.ok) {
        throw error("not found");
      }
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchUsers(users);
  }, []);

  const addUser = async (data) => {
    // let data = {
    //   email: formFields.email,
    //   password: formFields.password,
    // };

    try {
      const response = await fetch(`${baseURL}/user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });
      console.log(response);
      if (!response.ok) {
        if (response.status === 404) {
          console.log(response);
        } else {
          throw new Error("db problem");
        }
      }
      const result = await response.json();
      setMessage(result.message);
      openModal();
      fetchUsers();
      setCleanForm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id, e) => {
    try {
      const response = await fetch(`${baseURL}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert(
          "This user can not be deleted because it has entries in another table"
        );
        throw new Error(error);
      }
      const result = await response.json();
      setMessage(result.message);
      openModal();
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const editUser = async (data, id) => {
    try {
      const response = await fetch(`${baseURL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log(response);
        } else {
          throw new Error("db problem");
        }
      }
      const result = await response.json();
      setMessage(result.message);
      openModal();
      fetchUsers();
      setCleanForm(true);
    } catch (error) {
      console.log(error);
    }
  };
  const searchUser = async (searchValue) => {
    try {
      const response = await fetch(`${baseURL}/loans?search=${searchValue}`);
      if (!response.ok) {
        throw new Error("not found");
      }
      const result = await response.json();
      setUsers(result);
    } catch (error) {
      console.log(error);
    }
  };
  const sortUser = async (sortingColumn, order) => {
    if (order == "asc") {
      order = "desc";
    } else if (order == "desc") {
      order = "ASC";
    }
    try {
      const response = await fetch(
        `${baseURL}/users?sort=${sortingColumn}&order=${order}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("not found");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && (
        <section className="loader">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
      )}

      <h1 style={{ padding: "10px 50px" }}>Users Management</h1>
      <p style={{ padding: "0 50px" }}>
        <AddUserForm onSubmitUser={addUser} cleanForm={cleanForm} />
      </p>

      <p style={{ padding: "0 50px" }}>
        <UserSearch onSearch={searchUser} />
      </p>
      <UsersTable
        users={users}
        onRowDelete={deleteUser}
        onUpdateUser={editUser}
        onSorting={sortUser}
      />

      {modalIsOpen && (
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              height: 200,
              backgroundColor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 6,
            }}
          >
            <Button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                alignContent: "right",
              }}
            >
              close
            </Button>
            <br />
            <Typography id="modal-modal-description" sx={{ p: 6 }}>
              {message}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};
