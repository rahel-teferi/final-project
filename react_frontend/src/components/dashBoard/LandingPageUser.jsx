import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../core/AuthContext";

const url = "http://localhost:3000/users";

export const LandingPageUser = () => {
  // const [student, setStudent] = useState(null);
  // const { user } = useContext(AuthContext);
  // console.log(user);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const readUserInfo = async () => {
  //     try {
  //       const response = await fetch(`${url}/${user.userId}`);
  //       if (!response.ok) {
  //         throw Error("There was a problem connecting to the database!");
  //       }
  //       const student = await response.json();
  //       setStudent(student);
  //     } catch (error) {
  //       alert(error);
  //       console.log(error);
  //     }
  //   };
  //   if (user === null) {
  //     navigate("/login");
  //   } else {
  //     readStudentInfo();
  //   }
  // }, []);
  return (
    <>
      {/* {student && (
        <section>
          <p>
            <strong>Name:</strong>{" "}
            {student.student_first_name + " " + student.student_last_name}
          </p>
          <p>
            <strong>E-mail:</strong> {student.email}
          </p>
          <p>
            <strong>Birthdate:</strong> {student.birthdate}
          </p>
          <p>
            <strong>Gender:</strong> {student.gender}{" "}
            {student.gender === "O" ? student.gender_other : ""}
          </p>
        </section>
      )} */}
    </>
  );
};
