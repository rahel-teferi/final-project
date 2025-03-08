import "./App.css";

import AdminDashBoard from "./pages/AdminDashBoard";
import { Books } from "./pages/Books.jsx";

import SignInCard from "./components/LoginForm.jsx";
import { Route, Routes } from "react-router-dom";
import { Users } from "./pages/Users.jsx";
import { Loans } from "./pages/Loans.jsx";
import UserDashBoard from "./pages/UserDashBoard.jsx";
import { LandingPageUser } from "./components/dashBoard/LandingPageUser.jsx";
import { UserBooksTable } from "./components/Books/UserBooksTable.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInCard />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/user" element={<UserDashBoard />} />
        <Route path="books" element={<Books />} />
        <Route path="users" element={<Users />} />
        <Route path="loans" element={<Loans />} />
        <Route path="/hello" element={<LandingPageUser />} />
        <Route path="/userBookTable" element={<UserBooksTable />} />
        {/* <Route path="/userLoanTable" element={<UserLoanTable />} /> */}
      </Routes>
    </>
  );
}

export default App;
