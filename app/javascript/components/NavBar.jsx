import React from "react";
import { Typography, Box, Button, IconButton, Toolbar, AppBar } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
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
