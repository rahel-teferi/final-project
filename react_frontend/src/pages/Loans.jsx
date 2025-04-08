import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LoanTabel } from "../components/loans/LoanTabel.jsx";
import { LoanForm } from "../components/loans/LoanForm.jsx";
import { LoanSearch } from "../components/loans/LoanSearch.jsx";

export const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [cleanForm, setCleanForm] = useState(false);
  const baseURL = "https://library-management-system-4x5p.onrender.com";

  const [message, setMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
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
      setMessage(result.message);
      openModal();
      fetchLoans();
      setCleanForm(true);
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
      setMessage(result.message);
      openModal();
      fetchLoans();
      setCleanForm(true);
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
  const searchLoan = async (searchValue) => {
    try {
      const response = await fetch(`${baseURL}/loans?search=${searchValue}`);
      if (!response.ok) {
        throw new Error("not found");
      }
      const result = await response.json();
      setLoans(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 style={{ padding: "0 50px" }}>Loan/ Return Managment</h1>
      <div style={{ padding: "0 50px" }}>
        <LoanForm onSubmitLoan={addLoan} />
      </div>
      <div style={{ padding: "0 50px" }}>
        <LoanSearch onSearch={searchLoan} />
      </div>
      <LoanTabel loans={loans} onUpdateLoan={updateLoan} />
      {modalIsOpen && (
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              height: 200,
              backgroundColor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 6,
            }}
          >
            <Button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                alignContent: "right",
              }}
            >
              close
            </Button>
            <br />
            <Typography id="modal-modal-description" sx={{ p: 6 }}>
              {message}
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
};
