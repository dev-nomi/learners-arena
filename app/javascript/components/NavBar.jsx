import React, { Fragment } from "react";
import { Typography, Box, Button, Toolbar, AppBar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOutUser } from "../actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth_token = useSelector((state) => state.auth.auth_token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        navigate("/sign_in");
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
            {isLoggedIn && auth_token ? (
              <Fragment>
                <Button color="inherit" onClick={() => signOut()}>
                  Sign Out
                </Button>
                <Button color="inherit" to="/add_course" component={Link}>
                  Add Course
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" to="/sign_up" component={Link}>
                  Sign Up
                </Button>
                <Button color="inherit" to="/sign_in" component={Link}>
                  Sign In
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
