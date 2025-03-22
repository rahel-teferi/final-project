import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
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
export const Report = () => {
  const [data, setData] = useState([]);
  const baseURL = "http://localhost:3000";
  const fetchReports = async () => {
    try {
      const response = await fetch(`${baseURL}/books/report`);
      if (!response.ok) {
        throw new error("not found");
        console.log(response);
      }
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReports(data);
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
      <h3 style={{ textAlign: "center" }}>Catagories of books </h3>
      <PieChart width={600} height={400}>
        <Pie data={data} dataKey="book_count" nameKey="genre" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={Color[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
