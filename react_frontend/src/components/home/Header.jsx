import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthContext from "../core/AuthContext";
import { useContext } from "react";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";

export const Header = () => {
  const { isLogged, user } = useContext(AuthContext);
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/userbook">Books</Nav.Link>
              <Nav.Link href="#">Gallery</Nav.Link>
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
              <h5
                style={{
                  marginRight: "50px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Hello {user.name}
              </h5>
              <Nav.Link
                href="/"
                style={{
                  alignItems: "right",
                }}
              >
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
