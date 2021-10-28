import * as React from "react";
import TextField from "@mui/material/TextField";
import { Space } from "../../types/spaceTypes";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createSpace } from "../../store/users/actions";
import Typography from "@mui/material/Typography";
import { showMessageWithTimeout } from "../../store/appState/actions";

export default function CreateSpaceForm() {
  const dispatch = useDispatch();
  const initialState = {
    id: 0,
    title: "",
    description: "",
    logo_url: "",
    events: [],
  };
  const [space, setSpace] = useState<Space>(initialState);
  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    const { title, description } = space;
    if (!title || !description) {
      const message = "Please make sure to provide all necessary information";
      dispatch(showMessageWithTimeout("error", true, message, 3000));
    } else {
      dispatch(createSpace(space));
      setSpace(initialState);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "10% auto",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography gutterBottom variant="h4" component="div">
          Create your own space
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          In your space, you can create new events and see all your events!
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginBottom: "1em" }}
        >
          fill this form and click on submit!
        </Typography>
      </Box>
      <TextField
        required
        id="outlined-textarea"
        label="Title"
        multiline
        value={space.title}
        onChange={(event) =>
          setSpace({
            ...space,
            title: event.target.value,
          })
        }
      />
      <TextField
        required
        id="outlined-multiline-static"
        label="Description"
        style={{ margin: "1em 0" }}
        multiline
        rows={4}
        value={space.description}
        onChange={(event) =>
          setSpace({
            ...space,
            description: event.target.value,
          })
        }
      />
      <TextField
        id="outlined-textarea"
        label="logo Url"
        multiline
        style={{ margin: "1em 0" }}
        value={space.logo_url}
        onChange={(event) =>
          setSpace({
            ...space,
            logo_url: event.target.value,
          })
        }
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "#1b4332", color: "white" }}
        onClick={submitForm}
      >
        Submit
      </Button>
    </div>
  );
}
