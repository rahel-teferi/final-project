import React from "react";
// import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { useState, useEffect } from "react";

const Color = [
  "blue",
  "red",
  "Yellow",
  "Orange",
  "green",
  "Pink",
  "teal",
  "brown",
  "purple",
];
export const BookCatagories = () => {
  const [data, setData] = useState([]);
  const baseURL = "https://library-management-system-4x5p.onrender.com";
  const fetchBookCatagories = async () => {
    try {
      const response = await fetch(`${baseURL}/catagories`);
      if (!response.ok) {
        console.log(response);
      }
      console.log(response);
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookCatagories();
  }, []);

  return (
    <div
      style={{
        minHeight: "90vh",
        width: "100%",
        margin: "auto",
        maxWidth: "80vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px",
      }}
    >
      <h3 style={{ textAlign: "center" }}>
        Catagories of books in the Library
      </h3>
      {/* <PieChart width={600} height={400}>
        <Pie data={data} dataKey="book_count" nameKey="genre" label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={Color[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart> */}
    </div>
  );
};
