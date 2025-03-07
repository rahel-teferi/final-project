import React from "react";
import { NavLink } from "react-router-dom";
export const MenuAdmin = () => {
  const liStyle = {
    border: "1px solid teal",
    borderRadius: "15px",
    padding: "10px 20px",
    TextDecoder: "none",
    marginBottom: "50px",
  };
  return (
    <>
      <nav className="navMenu">
        <ul
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
            alignContent: "right",
          }}
        >
          <li style={liStyle}>
            <NavLink to="/books">Books</NavLink>
          </li>

          <li style={liStyle}>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li style={liStyle}>
            <NavLink to="/borrowReturns">Borrow/Return</NavLink>
          </li>
          <li style={liStyle}>
            <NavLink to="report">Reports</NavLink>
          </li>
          <li style={liStyle}>
            <NavLink to="/">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
