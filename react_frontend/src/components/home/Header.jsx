import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import AuthContext from "../core/AuthContext";
import { useContext } from "react";

export const Header = () => {
  const { isLogged } = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-body-primary">
      <Container fluid className="bg-primary">
        <Navbar.Brand href="#">Library management system</Navbar.Brand>
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
              <Nav.Link href="/" style={{ color: "black" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/userbook" style={{ color: "black" }}>
                Books
              </Nav.Link>
              <Nav.Link href="students" style={{ color: "black" }}>
                Students
              </Nav.Link>
            </Nav>
          )}
          {!isLogged && (
            <Nav.Link
              href="login"
              style={{ color: "black", alignItems: "right" }}
            >
              Login
            </Nav.Link>
          )}

          {isLogged && (
            <Nav.Link
              href="/"
              style={{
                color: "black",
                alignItems: "right",
                marginRight: "50px",
              }}
            >
              Logout
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
