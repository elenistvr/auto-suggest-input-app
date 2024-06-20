import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#0E1837", color: "white" }}
      >
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Hacker News Search
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/saved">
              Saved Stories
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container style={{ marginTop: "20px" }}>
        {children}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
