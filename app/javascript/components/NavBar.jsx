import React, { Fragment, useState } from "react";
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
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import MenuIcon from "@mui/icons-material/Menu";
import TeacherSideNav from "./TeacherSideNav";
import StudentSideNav from "./StudentSideNav";
import AdminSideNav from "./AdminSideNav";
import { useTheme } from "@mui/material/styles";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LinkIcon from "@mui/icons-material/Link";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import ArticleIcon from "@mui/icons-material/Article";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const Navbar = () => {
  const auth_token = useSelector((state) => state.auth.auth_token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [state, setState] = useState({
    drawer: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorAddNew, setAnchorAddNew] = useState(null);
  const openAddNew = Boolean(anchorAddNew);
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAddNew = (event) => {
    setAnchorAddNew(event.currentTarget);
  };

  const handleCloseAddNew = () => {
    setAnchorAddNew(null);
  };

  const signOut = () => {
    const config = {
      headers: {
        authorization: auth_token,
      },
    };
    axios
      .delete("/users/sign_out", config)
      .then(() => {
        toast.success("Successfully signed out.");
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
  const adminList = (anchor) => <AdminSideNav anchor={anchor} toggleDrawer={toggleDrawer} />;

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {isLoggedIn ? (
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
            ) : (
              <></>
            )}
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
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}
                      ></Avatar>
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
                      width: "250px",
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
                  <Box sx={{ paddingLeft: 2, paddingRight: 1, paddingBottom: 1 }}>
                    <Typography fontSize={15} fontWeight={600}>
                      {user?.first_name + " " + user?.last_name}
                    </Typography>
                    <Typography fontSize={15} sx={{ wordBreak: "break-all" }}>
                      {user?.email}
                    </Typography>
                    <Typography fontSize={15} color={theme.palette.primary.main}>
                      {user?.role}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem to="/home" component={Link}>
                    <ListItemIcon>
                      <DashboardRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => signOut()}>
                    <ListItemIcon>
                      <PowerSettingsNewRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
                {user?.role === "teacher" && (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                      <Tooltip title="Add new">
                        <Button
                          endIcon={<KeyboardArrowDownRoundedIcon />}
                          onClick={handleClickAddNew}
                          aria-controls={openAddNew ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openAddNew ? "true" : undefined}
                          color="secondary"
                          variant="contained"
                          sx={{ ml: 2, borderRadius: 4 }}
                        >
                          Add new
                        </Button>
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={anchorAddNew}
                      id="account-menu"
                      open={openAddNew}
                      onClose={handleCloseAddNew}
                      onClick={handleCloseAddNew}
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
                      <MenuItem to="/add_course" component={Link}>
                        <ListItemIcon>
                          <SchoolRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        Course
                      </MenuItem>
                      <Divider />
                      <MenuItem to="/add_handout" component={Link}>
                        <ListItemIcon>
                          <ArticleIcon fontSize="small" />
                        </ListItemIcon>
                        Handout
                      </MenuItem>
                      <MenuItem to="/add_video" component={Link}>
                        <ListItemIcon>
                          <VideoLibraryIcon fontSize="small" />
                        </ListItemIcon>
                        Video
                      </MenuItem>
                      <MenuItem to="/add_reference_link" component={Link}>
                        <ListItemIcon>
                          <LinkIcon fontSize="small" />
                        </ListItemIcon>
                        Reference Link
                      </MenuItem>
                      <MenuItem to="/add_quiz" component={Link}>
                        <ListItemIcon>
                          <QuizIcon fontSize="small" />
                        </ListItemIcon>
                        Quiz
                      </MenuItem>
                      <MenuItem to="/add_assignment" component={Link}>
                        <ListItemIcon>
                          <AssignmentIcon fontSize="small" />
                        </ListItemIcon>
                        Assignment
                      </MenuItem>
                    </Menu>
                  </>
                )}
                <Drawer
                  anchor={"left"}
                  open={state["drawer"]}
                  onClose={toggleDrawer("drawer", false)}
                >
                  {user?.role === "teacher" && teacherList("drawer")}
                  {user?.role === "student" && studentList("drawer")}
                  {user?.role === "admin" && adminList("drawer")}
                </Drawer>
              </Fragment>
            ) : (
              <Fragment>
                <Button to="/sign_in" component={Link} color="secondary" variant="contained">
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
