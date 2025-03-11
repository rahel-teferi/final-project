import React from "react";
import LoginForm from "../components/LoginForm";

export const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        minWidth: "500px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "50%" }}>
        <h1 style={{ textAlign: "center" }}>Library management system</h1>
        <LoginForm />
      </div>
    </div>
  );
};
