import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { signInUser } from "../../actions";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData();
    user.append("user[email]", email);
    user.append("user[password]", password);

    axios
      .post("users/sign_in", user)
      .then((response) => {
        toast.success("Successfully Signed In.");
        setEmail("");
        setPassword("");
        dispatch(signInUser(response));
        axios.defaults.headers.common["Authorization"] = response.headers.authorization;
        localStorage.setItem("auth_token", response.headers.authorization);
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.response);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
        <Typography>
          New to LearnersArena <Link to="/sign_up">Sign up now.</Link>
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
