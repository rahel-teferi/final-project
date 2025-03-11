import "./App.css";

import AdminDashBoard from "./pages/AdminDashBoard";
import { Books } from "./pages/Books.jsx";

import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/Users.jsx";
import { Loans } from "./pages/Loans.jsx";
import UserDashBoard from "./pages/UserDashBoard.jsx";
import { Profile } from "./components/dashBoard/Profile.jsx";
import { UserBooksTable } from "./components/books/UserBooksTable.jsx";
// import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./components/core/AuthContext";
import { useContext } from "react";
import { Login } from "./pages/Login.jsx";
import { UserloanedTable } from "./components/books/UserLoanedTable.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { HomePage } from "./components/home/HomePage.jsx";
import ProtectedRoute from "./components/core/ProtectedRoute.jsx";
import Logout from "./pages/Logout.jsx";
import Header from "./components/home/Header.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userbook" element={<UserBooksTable />} />
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/user" element={<UserDashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/loaned" element={<UserloanedTable />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="books" element={<Books />} />
            <Route path="users" element={<Users />} />
            <Route path="loans" element={<Loans />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
