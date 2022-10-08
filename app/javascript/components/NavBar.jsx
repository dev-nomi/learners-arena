import React, { Fragment } from "react";
import {
  Typography,
  Box,
  Toolbar,
  AppBar,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Drawer,
} from "@mui/material";
import { useSelector } from "react-redux";
import { signOutUser } from "../actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import TeacherSideNav from "./TeacherSideNav";
import StudentSideNav from "./StudentSideNav";

const Navbar = () => {
  const auth_token = useSelector((state) => state.auth.auth_token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [state, setState] = React.useState({
    drawer: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      .catch((error) => {
        toast.error(error);
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const teacherList = (anchor) => <TeacherSideNav anchor={anchor} toggleDrawer={toggleDrawer} />;
  const studentList = (anchor) => <StudentSideNav anchor={anchor} toggleDrawer={toggleDrawer} />;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("drawer", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}>
              Learners arena
            </Typography>
            {isLoggedIn ? (
              <Fragment>
                <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem to="/home" component={Link}>
                    Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => signOut()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                <Drawer
                  anchor={"left"}
                  open={state["drawer"]}
                  onClose={toggleDrawer("drawer", false)}
                >
                  {user.role === "teacher" ? teacherList("drawer") : studentList("drawer")}
                </Drawer>
              </Fragment>
            ) : (
              <Fragment>
                <Button to="/sign_in" component={Link} color="inherit">
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
