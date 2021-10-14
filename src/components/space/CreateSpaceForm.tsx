import * as React from "react";
import TextField from "@mui/material/TextField";
import { Space } from "../../types/spaceTypes";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "@mui/material/Button";
import { createSpace } from "../../store/users/actions";

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
    dispatch(createSpace(space));

    setSpace(initialState);
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
      <TextField
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
      <Button variant="contained" color="primary" onClick={submitForm}>
        Submit
      </Button>
    </div>
  );
}
