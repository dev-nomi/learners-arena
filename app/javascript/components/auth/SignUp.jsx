import React, { useState } from "react";
import { Button, TextField, Grid, Box, Container, Typography, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../../actions";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Errors from "../Errors";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assests/logo-learners-black";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData();
    user.append("user[email]", email);
    user.append("user[password]", password);
    user.append("user[password_confirmation]", passwordConfirmation);
    user.append("user[role]", role);
    user.append("user[last_name]", lastName);
    user.append("user[first_name]", firstName);

    axios
      .post("users", user)
      .then((response) => {
        toast.success("Successfully signed up.");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        dispatch(registerUser(response));
        axios.defaults.headers.common["Authorization"] = response.headers.authorization;
        localStorage.setItem("auth_token", response.headers.authorization);
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.response);
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <img src={Logo} style={{ width: "120px" }} />
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="lastname"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                id="password-confirmation"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-role"
                select
                required
                fullWidth
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"teacher"}>Teacher</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
