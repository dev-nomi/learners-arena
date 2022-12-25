import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Box, Typography, Container, MenuItem, Grid } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Errors from "../../Errors";

const EditUser = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    axios
      .get(`/api/v1/students/${id}`)
      .then(({ data }) => {
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      })
      .catch((error) => {});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new FormData();
    user.append("user[email]", email);
    user.append("user[first_name]", firstName);
    user.append("user[last_name]", lastName);

    axios
      .put(`/api/v1/students/${id}`, user)
      .then((response) => {
        toast.success(`Successfully update the ${isStudentPath ? "student" : "teacher"}`);
        setEmail("");
        setFirstName("");
        setLastName("");
        if (isStudentPath) {
          navigate("/admin/all_students");
        } else {
          navigate("/admin/all_teachers");
        }
      })
      .catch((error) => {
        toast.error(<Errors errors={error.response.data} />);
      });
  };

  const isStudentPath = location.pathname.includes("student");

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
        <Typography component="h1" variant="h4">
          Edit {isStudentPath ? "student" : "teacher"}
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
                inputProps={{
                  maxLength: 50,
                }}
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
                inputProps={{
                  maxLength: 50,
                }}
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
                inputProps={{
                  maxLength: 100,
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditUser;
