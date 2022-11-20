import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  Box,
  ListItemIcon,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const TeacherSideNav = ({ anchor, toggleDrawer }) => {
  return (
    <Box
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton to="/home" component={Link}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton to="/" component={Link}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={"All courses"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/all_quizzes" component={Link}>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary={"All Quizzes"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/all_assignments" component={Link}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={"All Assignments"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default TeacherSideNav;
