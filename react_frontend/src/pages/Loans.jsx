import React, { useEffect, useState } from "react";

import { LoanTabel } from "../components/Loans/LoanTabel.jsx";
import { LoanForm } from "../components/loans/LoanForm.jsx";

export const Loans = () => {
  const [loans, setLoans] = useState([]);

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
  const updateLoan = async (data, id) => {
    try {
      const response = await fetch(`${baseURL}/loans/${id}`, {
        method: "PUT",
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
      alert(result.message);
      fetchLoans();
      // setCleanForm(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch(`${baseURL}/loans`);

      if (!response.ok) {
        throw error("not found");
      }

      const result = await response.json();
      setLoans(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);
  return (
    <div>
      <h1>Loan/ Return Managment</h1>
      <LoanForm onSubmitLoan={addLoan} />

      <LoanTabel loans={loans} onUpdateLoan={updateLoan} />
    </div>
  );
};
