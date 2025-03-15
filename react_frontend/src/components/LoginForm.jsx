import * as React from "react";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import AuthContext from "../components/core/AuthContext";
import { useNavigate } from "react-router";

const url = "http://localhost:3000";

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",

  // },
  "&::before": {
    content: '""',
    display: "inline",
    // position: "absolute",
    // zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  margin: "auto",

  padding: theme.spacing(4),
  gap: theme.spacing(2),

  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function LoginForm() {
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: formFields.email,
      password: formFields.password,
    };

    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });

      if (!response.ok) {
        if (response.status === 409) {
          const result = await response.json();
          throw Error(result.message);
        } else {
          throw Error("There was a problem connecting to the database!");
        }
      }
      const result = await response.json();

      // alert(result.found);
      if (result.found === true) {
        // we get all the fields from the students table
        login({
          userId: result.data.user_id,
          name: result.data.name,
          role: result.data.role,
        });

        if (result.data.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        // show error - Wrong credentials
        setError("Wrong credentials");
      }
    } catch (error) {
      // setError(error.message);

      alert(error);
    }
  };

  const handleBlur = (e) => {
    const emailValidation = /\S+@\S+\.\S+/;

    if (emailValidation.test(e.target.value) || e.target.value == "") {
      setEmailError(false);
    } else {
      console.log("error");
      setEmailError(true);
    }
  };
  return (
    <>
      <SignInContainer height="90vh" margin="auto" maxWidth="500px">
        <Card variant="outlined">
          <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 5,
            }}
          >
            <div id="modal-modal-description" sx={{ mt: 2 }}>
              <FormControl style={{ marginBottom: "30px", width: "100%" }}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{}}
                />
                {emailError && (
                  <p style={{ color: "red" }}>Wronge email format</p>
                )}
              </FormControl>
              <FormControl style={{ marginBottom: "30px", width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    sx={{ alignSelf: "baseline" }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  value={formFields.password}
                  onChange={handleChange}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button
                  style={{ marginTop: "30px" }}
                  value="Login"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Login
                </Button>
              </FormControl>
            </div>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
