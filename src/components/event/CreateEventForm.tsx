import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Event } from "../../types/eventTypes";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import { createEvent } from "../../store/events/actions";
import { useHistory } from "react-router-dom";

export default function CreateEventForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    start_date: new Date(),
    end_date: new Date(),
    capacity: 0,
    is_online: true,
    location: "",
  };
  const [event, setEvent] = useState<Event>(initialState);
  function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createEvent(event));
    setEvent(initialState);
    history.push(`/mySpace`);
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
      <Typography gutterBottom variant="h4" component="div">
        Your New Event
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        style={{ marginBottom: "1em" }}
      >
        fill this form and click on submit!
      </Typography>
      <TextField
        id="outlined-textarea"
        label="Title"
        multiline
        value={event.title}
        onChange={(e) =>
          setEvent({
            ...event,
            title: e.target.value,
          })
        }
      />
      <TextField
        id="outlined-multiline-static"
        label="Description"
        style={{ margin: "1em 0" }}
        multiline
        rows={4}
        value={event.description}
        onChange={(e) =>
          setEvent({
            ...event,
            description: e.target.value,
          })
        }
      />
      <TextField
        id="outlined-textarea"
        label="image Url"
        multiline
        style={{ margin: "1em 0" }}
        value={event.imageUrl}
        onChange={(e) =>
          setEvent({
            ...event,
            imageUrl: e.target.value,
          })
        }
      />
      {/* @ts-ignore */}
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Stack spacing={3}>
          <DateTimePicker
            label="Start date"
            value={event.start_date}
            onChange={(date) =>
              setEvent({
                ...event,
                start_date: date,
              })
            }
            renderInput={(params: any) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End date"
            value={event.end_date}
            onChange={(date) =>
              setEvent({
                ...event,
                end_date: date,
              })
            }
            renderInput={(params: any) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>

      <TextField
        style={{ margin: "1em 0" }}
        id="Capacity"
        value={event.capacity}
        onChange={(e) =>
          setEvent({
            ...event,
            capacity: parseInt(e.target.value),
          })
        }
        label="Capacity"
        type="number"
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={() =>
                setEvent({
                  ...event,
                  is_online: !event.is_online,
                })
              }
            />
          }
          label="Online Event"
        />
      </FormGroup>
      <TextField
        style={{ margin: "1em 0" }}
        id="outlined-textarea"
        label="Location"
        multiline
        value={event.location}
        onChange={(e) =>
          setEvent({
            ...event,
            location: e.target.value,
          })
        }
      />
      <Button variant="contained" color="primary" onClick={submitForm}>
        Submit
      </Button>
    </div>
  );
}
