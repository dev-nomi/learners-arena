import React from 'react'
import { 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Toolbar, 
  AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return(
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
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Learners arena
            </Typography>
            <Button color="inherit">Signin</Button>
            <Button color="inherit">Signup</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;