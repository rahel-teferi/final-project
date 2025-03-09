import "./App.css";

import AdminDashBoard from "./pages/AdminDashBoard";
import { Books } from "./pages/Books.jsx";

import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/Users.jsx";
import { Loans } from "./pages/Loans.jsx";
import UserDashBoard from "./pages/UserDashBoard.jsx";
import { LandingPageUser } from "./components/dashBoard/LandingPageUser.jsx";
import { UserBooksTable } from "./components/books/UserBooksTable.jsx";
// import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./components/core/AuthContext";
import { useContext } from "react";
import { Login } from "./pages/Login.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/user" element={<UserDashBoard />} />
        <Route path="books" element={<Books />} />
        <Route path="users" element={<Users />} />
        <Route path="loans" element={<Loans />} />
        <Route path="/hello" element={<LandingPageUser />} />
        {/* <Route
          path="hello"
          element={
            // <ProtectedRoute user={user}>
            <LandingPageUser />
            // </ProtectedRoute>
          } */}
        {/* /> */}

        <Route path="/userBookTable" element={<UserBooksTable />} />
        {/* <Route path="/userLoanTable" element={<UserLoanTable />} /> */}
      </Routes>
    </>
  );
}

export default App;
