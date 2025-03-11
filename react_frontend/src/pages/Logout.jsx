import { useContext, useEffect } from "react";
import AuthContext from "../components/core/AuthContext.jsx";
import { useNavigate } from "react-router";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
