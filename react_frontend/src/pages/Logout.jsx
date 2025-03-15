import { useContext, useEffect } from "react";
import AuthContext from "../components/core/AuthContext.jsx";
import { useNavigate } from "react-router";

export const Logout = () => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);

  return null;
};
