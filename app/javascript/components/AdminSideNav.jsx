import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PersonIcon from "@mui/icons-material/Person";
import FeedbackIcon from "@mui/icons-material/Feedback";
import {
  Box,
  ListItemIcon,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const AdminSideNav = ({ anchor, toggleDrawer }) => {
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
          <ListItemButton to="/admin/all_courses" component={Link}>
            <ListItemIcon>
              <SchoolRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"All Courses"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/admin/all_students" component={Link}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"All Students"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/admin/all_teachers" component={Link}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"All Teachers"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/admin/all_responses" component={Link}>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary={"All Responses"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSideNav;
