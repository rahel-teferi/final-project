import "./App.css";

import AdminDashBoard from "./pages/AdminDashBoard";
import { Books } from "./pages/Books.jsx";

import { Login } from "./pages/Login.jsx";
import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/Users.jsx";
import { BorrowReturn } from "./pages/BorrowReturn.jsx";
import UserDashBoard from "./pages/UserDashBoard.jsx";
import { LandingPageUser } from "./components/dashBoard/LandingPageUser.jsx";
import { UserBooksTable } from "./components/Books/UserBooksTable.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminHome" element={<AdminDashBoard />} />
        <Route path="/userHome" element={<UserDashBoard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route path="/borrowReturns" element={<BorrowReturn />} />
        <Route path="/hello" element={<LandingPageUser />} />
        <Route path="/userBookTable" element={<UserBooksTable />} />
        {/* <Route path="/userBorrowTable" element={<UserBorrowTable />} /> */}
      </Routes>
    </>
  );
}

export default App;
