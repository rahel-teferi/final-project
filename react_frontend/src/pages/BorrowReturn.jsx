import React, { useEffect } from "react";
import { BorrowForm } from "../components/BorrowReturn/BorrowForm";
import { ReturnForm } from "../components/BorrowReturn/ReturnForm";
import { BorrowReturnTabel } from "../components/BorrowReturn/BorrowReturnTabel.jsx";

export const BorrowReturn = () => {
  const baseURL = "http://localhost:3000";
  const addBorrow = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${baseURL}/borrowReturns`, {
        method: "POST",
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
      console.log(result);
      //alert(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addBorrow();
  }, []);

  return (
    <div>
      <h1>Borrow/ Return Managment</h1>
      <BorrowForm onSubmitBorrow={addBorrow} />
      <ReturnForm />
      <BorrowReturnTabel />
    </div>
  );
};
