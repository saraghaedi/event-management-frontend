import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
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
import { showMessageWithTimeout } from "../../store/appState/actions";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../store/categories/selectors";
import MenuItem from "@mui/material/MenuItem";
import { fetchAllCategories } from "../../store/categories/actions";
import { Category } from "../../types/categoryTypes";

export default function CreateEventForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const initialState = {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    start_date: new Date(),
    end_date: new Date(),
    capacity: 0,
    is_online: false,
    location: "",
    price: 0,
    spaceId: 0,
    categoryId: null,
  };

  const categoryInitialState = {
    id: 0,
    title: "",
  };

  const [event, setEvent] = useState<Event>(initialState);
  const [category, setCategory] = useState<Category>(categoryInitialState);

  function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    const {
      title,
      description,
      start_date,
      end_date,
      capacity,
      location,
      price,
    } = event;
    if (
      !title ||
      !description ||
      !start_date ||
      !end_date ||
      !capacity ||
      !location ||
      !price
    ) {
      const message = "Please make sure to provide all necessary information";
      dispatch(showMessageWithTimeout("error", true, message, 3000));
    } else {
      dispatch(createEvent(event));
      setEvent(initialState);
      history.push(`/my-space`);
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
        required
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
        required
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
        required
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
      <FormGroup
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={event.is_online!}
              onChange={() => {
                setEvent({
                  ...event,
                  is_online: !event.is_online,
                });
              }}
            />
          }
          label="Online Event"
        />
        <div
          style={{
            display: "flex",
            width: "60%",
            alignItems: "center",
          }}
        >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category.title}
            style={{ width: "80%", marginLeft: "1em" }}
          >
            {categories.map((category) => {
              return (
                <MenuItem
                  key={category.id}
                  value={category.title}
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory({ id: category.id, title: category.title });
                    setEvent({
                      ...event,
                      categoryId: category.id,
                    });
                  }}
                >
                  {category.title}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      </FormGroup>
      <TextField
        required
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
      <TextField
        required
        style={{ margin: "1em 0" }}
        id="price"
        value={event.price}
        onChange={(e) =>
          setEvent({
            ...event,
            price: parseInt(e.target.value),
          })
        }
        label="price"
        type="number"
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "#1b4332" }}
        onClick={submitForm}
      >
        Submit
      </Button>
    </div>
  );
}
