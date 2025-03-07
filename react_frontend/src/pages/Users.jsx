import React from "react";
import { AddUserForm } from "../components/Users/AddUserForm";
import { UsersTable } from "../components/Users/UsersTable";
import { useState, useEffect } from "react";
import { MenuAdmin } from "../components/MenuAdmin";
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
  }, [users]);

  const addUser = async (data) => {
    try {
      const response = await fetch(`${baseURL}/users`, {
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
      console.log(result);
      alert(result.message);
      await fetchUsers();
      setCleanForm(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id, e) => {
    try {
      const response = await fetch(`${baseURL}/books/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("not found");
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
      console.log(result);
      alert(result.message);
      fetchUsers();
      setCleanForm(true);
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

      <h1>Users Managment</h1>
      <AddUserForm onSubmitUser={addUser} cleanForm={cleanForm} />
      <UsersTable
        users={users}
        onRowDelete={deleteUser}
        onUpdateUser={editUser}
      />
    </div>
  );
};
