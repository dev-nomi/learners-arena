import React from "react";
import { Typography, Box, Button, Toolbar, AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutUser } from "../actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const auth_token = useSelector((state) => state.auth_token);
  const dispatch = useDispatch();

  const signOut = () => {
    const config = {
      headers: {
        authorization: auth_token,
      },
    };
    axios
      .delete("users/sign_out", config)
      .then(() => {
        toast.success("Successfully Signed Out.");
        dispatch(signOutUser());
        localStorage.removeItem("auth_token");
        axios.defaults.headers.common["Authorization"] = null;
      })
      .catch((error) => {});
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
              to="/"
              component={Link}
            >
              Learners arena
            </Typography>
            <Button color="inherit" to="/sign_up" component={Link}>
              Sign Up
            </Button>
            <Button color="inherit" to="/sign_in" component={Link}>
              Sign In
            </Button>
            <Button color="inherit" onClick={() => signOut()}>
              Sign Out
            </Button>
            <Button color="inherit" to="/add_course" component={Link}>
              Add Course
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
