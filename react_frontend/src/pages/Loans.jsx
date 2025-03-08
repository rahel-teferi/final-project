import React, { useEffect } from "react";

import { LoanTabel } from "../components/Loans/LoanTabel.jsx";
import { LoanForm } from "../components/loans/LoanForm.jsx";

export const Loans = () => {
  const baseURL = "http://localhost:3000";

  const addLoan = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`${baseURL}/loans`, {
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

      alert(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Loan/ Return Managment</h1>
      <LoanForm onSubmitLoan={addLoan} />

      <LoanTabel />
    </div>
  );
};
