import React from "react";
import banner from "/banner-bg.png";
export const Contact = () => {
  return (
    <div
      style={{
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          padding: "250px 0 ",
          backgroundImage: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <p>Address: Library street 1, 12345 Berlin </p>
        <p>Phone number: +49-123-456-789</p>
        <p>Email: library@info.com </p>
        <p>Opening hours: Monday - Friday from 9am - 8pm</p>

        <p style={{ padding: "50px" }}> ** Registration is only in person</p>
      </div>
    </div>
  );
};
