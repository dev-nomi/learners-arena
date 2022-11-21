import React from "react";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
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
              <DashboardRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton to="/handouts" component={Link}>
            <ListItemIcon>
              <ArticleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"All handouts "} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/videos" component={Link}>
            <ListItemIcon>
              <VideoLibraryRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"All Videos"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/reference_links" component={Link}>
            <ListItemIcon>
              <InsertLinkRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"All Reference Links"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/quizzes" component={Link}>
            <ListItemIcon>
              <QuizRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"All Quizzes"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/assignments" component={Link}>
            <ListItemIcon>
              <AssignmentRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"All Assignments"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default TeacherSideNav;
