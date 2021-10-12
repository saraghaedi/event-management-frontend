import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Credentials } from "../../types/userTypes";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "../../store/users/actions";
import { useDispatch } from "react-redux";

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

export default function LoginForm(props: any) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { set_modalForm } = props;
  const initialState = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState<Credentials>(initialState);
  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    dispatch(login(credentials));

    setCredentials(initialState);
  }

  return (
    <DialogContent>
      <TextField
        autoFocus
        value={credentials.email}
        onChange={(event) =>
          setCredentials({
            ...credentials,
            email: event.target.value,
          })
        }
        type="email"
        label="Email address"
        fullWidth
        required
      />
      <TextField
        style={{ margin: "1em 0" }}
        value={credentials.password}
        onChange={(event) =>
          setCredentials({
            ...credentials,
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
          Log in
        </Button>
      </DialogActions>
      <DialogContentText className={classes.dialogFooter}>
        Don't have an account yet? Sign up{" "}
        <Typography
          component="span"
          onClick={() => set_modalForm("Signup")}
          style={{ cursor: "pointer" }}
        >
          HERE
        </Typography>
      </DialogContentText>
    </DialogContent>
  );
}
