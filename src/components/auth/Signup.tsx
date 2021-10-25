import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users/actions";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { SignupData } from "../../types/userTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogFooter: {
    fontSize: "0.8rem",
    width: "100%",
    textAlign: "center",
  },
}));

export default function SingUp(props: any) {
  const classes = useStyles();
  const { handleClose, set_modalForm } = props;
  const dispatch = useDispatch();
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [signUpcredentials, set_signUpcredentials] =
    useState<SignupData>(initialState);

  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    dispatch(signUp(signUpcredentials));
    handleClose();
    set_signUpcredentials(initialState);
  }

  return (
    <DialogContent>
      <TextField
        value={signUpcredentials.name}
        onChange={(event) =>
          set_signUpcredentials({
            ...signUpcredentials,
            name: event.target.value,
          })
        }
        type="text"
        autoFocus
        label="Name"
        fullWidth
        required
      />
      <TextField
        style={{ margin: "1em 0" }}
        value={signUpcredentials.email}
        onChange={(event) =>
          set_signUpcredentials({
            ...signUpcredentials,
            email: event.target.value,
          })
        }
        type="email"
        label="Email address"
        fullWidth
        required
      />
      <TextField
        style={{ marginBottom: ".5em" }}
        value={signUpcredentials.password}
        onChange={(event) =>
          set_signUpcredentials({
            ...signUpcredentials,
            password: event.target.value,
          })
        }
        type="password"
        label="Password"
        fullWidth
        required
      />
      <DialogActions>
        <Button variant="contained" color="primary" onClick={submitForm}>
          SignUp
        </Button>
      </DialogActions>
      <DialogContentText className={classes.dialogFooter}>
        Already have an account? Login{" "}
        <Typography
          component="span"
          onClick={() => set_modalForm("Login")}
          style={{ cursor: "pointer" }}
        >
          HERE
        </Typography>
      </DialogContentText>
    </DialogContent>
  );
}
