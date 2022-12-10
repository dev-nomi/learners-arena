import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container, Link as MuiLink } from "@mui/material";
import { useDispatch } from "react-redux";
import { signInUser } from "../../actions";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assests/logo-learners-black";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData();
    user.append("user[email]", email);
    user.append("user[password]", password);

    axios
      .post("users/sign_in", user)
      .then((response) => {
        toast.success("Successfully signed in.");
        setEmail("");
        setPassword("");
        dispatch(signInUser(response));
        axios.defaults.headers.common["Authorization"] = response.headers.authorization;
        localStorage.setItem("auth_token", response.headers.authorization);
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <img src={Logo} style={{ width: "120px" }} />

        <Typography component="h1" variant="h4">
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
        New to Learners Arena{" "}
        <MuiLink to="/sign_up" component={Link}>
          Sign up now
        </MuiLink>
      </Typography>
    </Container>
  );
};

export default SignIn;
