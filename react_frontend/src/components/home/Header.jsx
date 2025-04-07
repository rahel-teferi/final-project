import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../core/AuthContext";
import { useContext } from "react";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { Link } from "react-router-dom";
export const Header = () => {
  const { isLogged, user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout(); // Clear user authentication state
    navigate("/login"); // Redirect to login page after logout (or home page if needed)
  };
  return (
    <Navbar
      expand="lg"
      style={{
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Container
        fluid
        style={{
          margin: "auto",
          alignItems: "center",
        }}
      >
        <NavbarBrand href="#" style={{ fontSize: "25px" }}>
          Library management system
        </NavbarBrand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{ justifyContent: "right" }}>
          {!isLogged && (
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{
                maxHeight: "100px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Nav.Item>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/userbook" className="nav-link">
                  Books
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </Nav.Item>
            </Nav>
          )}
          {!isLogged && (
            <Nav.Item>
              <Link to="/login" className="nav-link" style={{ color: "black" }}>
                Login
              </Link>
            </Nav.Item>
          )}

          {isLogged && (
            <>
              <h5
                style={{
                  marginRight: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Hello {user.name}
              </h5>
              <Nav.Link href="/" style={{ alignItems: "right" }}>
                Logout
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
