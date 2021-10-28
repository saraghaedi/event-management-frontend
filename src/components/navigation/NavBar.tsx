import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import { Button } from "@material-ui/core";
import AuthModal from "../auth/AuthModal";
import Logout from "../auth/Logout";
import { selectUser } from "../../store/users/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    // marginLeft: "1vw",
    fontWeight: "bold",
    color: "#aa0d00",
    backgroundColor: "#ffffff",
    "&:hover": {
      color: "#000000",
      backgroundColor: "#ffa000",
    },
  },
}));

export default function ButtonAppBar(props: any) {
  const user = useSelector(selectUser);
  const classes = useStyles();

  return (
    <Paper variant="elevation" color="primary">
      <AppBar position="static">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            marginX={4}
          >
            {/* <Box>
              <IconButton
                component={Link}
                to="/"
                className={classes.menuButton}
                edge="start"
                color="inherit"
                aria-label="menu"
              ></IconButton>
            </Box> */}
            <Link style={{ color: "white", textDecoration: "none" }} to="/">
              <Button className={classes.btn}>Home </Button>
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/my-space"
            >
              <Button className={classes.btn}>My Space</Button>
            </Link>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/my-tickets"
            >
              <Button className={classes.btn}>My tickets</Button>
            </Link>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {user.token ? <Logout user={user} /> : <AuthModal />}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}
