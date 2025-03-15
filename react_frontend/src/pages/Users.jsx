import React from "react";
import { AddUserForm } from "../components/users/AddUserForm";
import { UsersTable } from "../components/Users/UsersTable";
import { useState, useEffect } from "react";
import { UserSearch } from "../components/users/UserSearch";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cleanForm, setCleanForm] = useState(false);

  const baseURL = "http://localhost:3000";
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
      alert(result.message);
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
      alert(result.message);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const editUser = async (data, id) => {
    console.log(data);
    console.log(typeof id);
    try {
      const response = await fetch(`${baseURL}/users/${id}`, {
        method: "PUT",
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
      alert(result.message);
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
    </div>
  );
};
