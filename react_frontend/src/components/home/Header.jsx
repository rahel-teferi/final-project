import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import AuthContext from "../core/AuthContext";
import { useContext } from "react";

export const Header = () => {
  const { isLogged, user } = useContext(AuthContext);
  return (
    <Navbar
      expand="lg"
      style={{
        minWidth: "500px",
        height: "75px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Container fluid>
        <Navbar.Brand
          href="#"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
          }}
          // className="text-primary "
        >
          Library management system
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{ justifyContent: "right" }}>
          {!isLogged && (
            <Nav
              className="me-auto my-2 my-lg-0 "
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
              <Nav.Link href="Contact" style={{ color: "black" }}>
                Contact
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
            <>
              <h5 style={{ margin: "5px 100px 0 0", alignItems: "center" }}>
                Hello {user.name}
              </h5>
              <Nav.Link
                href="/"
                style={{
                  color: "black",
                  alignItems: "right",
                  marginRight: "50px",
                }}
              >
                <h5> Logout</h5>
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
