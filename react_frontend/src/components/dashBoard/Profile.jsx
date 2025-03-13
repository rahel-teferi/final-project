import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";

import AuthContext from "../core/AuthContext";
const url = "http://localhost:3000/users";
export const Profile = () => {
  const [member, setMember] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const readUserInfo = async () => {
      try {
        const response = await fetch(`${url}/${user.userId}`);

        if (!response.ok) {
          throw Error("There was a problem connecting to the database!");
        }
        const result = await response.json();

        setMember(result);
      } catch (error) {
        alert(error);
      }
    };
    if (user === null) {
      navigate("/login");
    } else {
      readUserInfo(user.userId);
    }
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      {/* <h1>Welcome {member.name}</h1> */}
      <h4>Personal information</h4>
      {member && (
        <section>
          <p>
            <strong>Name:</strong>
            {member.name}
          </p>
          <p>
            <strong>E-mail:</strong> {member.email}
          </p>
          <p>
            <strong>Role:</strong> {member.role}
          </p>
        </section>
      )}
    </div>
  );
};
