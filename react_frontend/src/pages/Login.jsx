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
        <h1 style={{ textAlign: "center" }}>Library managment system</h1>
        <LoginForm />
      </div>
      {/* <div style={{ width: "50%" }}>
        <img
          style={{
            display: "flex",
            width: "100%",
            height: "90vh",
            objectFit: "contain",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          src={books}
        /> */}
      {/* </div> */}
    </div>
  );
};
