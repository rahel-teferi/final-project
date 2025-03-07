import React from "react";
import SignInCard from "../components/LoginForm";
import books from "/Books.jpg";

export const Login = () => {
  return (
    <div
      style={{
        display: "flex",

        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "50%" }}>
        <h1 style={{ textAlign: "center" }}>Library managment system</h1>
        <SignInCard />
      </div>
      <div style={{ width: "50%" }}>
        <img
          style={{
            width: "100%",
            height: "90vh",
            objectFit: "fit",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          src={books}
        />
      </div>
    </div>
  );
};
