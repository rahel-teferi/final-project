import "./App.css";

import AdminDashBoard from "./pages/AdminDashBoard";
import { Books } from "./pages/Books.jsx";
import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/Users.jsx";
import { Loans } from "./pages/Loans.jsx";
import UserDashBoard from "./pages/UserDashBoard.jsx";
import { Profile } from "./components/dashBoard/Profile.jsx";
import { UserBooks } from "./pages/UserBooks.jsx";
import AuthContext from "./components/core/AuthContext";
import { useContext } from "react";
import { UserLoanedTable } from "components/books/UserLoanedTable.jsx";
import LoginForm from "./components/LoginForm.jsx";
import HomePage from "./components/home/HomePage.jsx";
import ProtectedRoute from "./components/core/ProtectedRoute.jsx";
import { Logout } from "./pages/Logout.jsx";
import Header from "./components/home/Header.jsx";
import { Contact } from "./components/home/Contact.jsx";
import { BookCatagories } from "./components/charts/BookCatagories.jsx";

function App() {
  const { user } = useContext(AuthContext);
  const login = window.localStorage.getItem("isLoggedIn");
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={login ? <HomePage /> : <LoginForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userbook" element={<UserBooks />} />
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/user" element={<UserDashBoard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/catagories" element={<BookCatagories />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/loaned" element={<UserLoanedTable />} />
          </Route>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="books" element={<Books />} />
            <Route path="users" element={<Users />} />
            <Route path="loans" element={<Loans />} />
          </Route>
        </Routes>
      </main>
      <footer style={{ textAlign: "center" }}>Copyright &#64; 2025</footer>
    </div>
  );
}

export default App;
