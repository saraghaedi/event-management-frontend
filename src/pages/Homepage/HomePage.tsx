import EventCard from "../../components/event/EventCard";
import { fetchAllEvents } from "../../store/events/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  selectAllEvents,
  selectSearchedEvents,
  selectFilteredEvents,
} from "../../store/events/selectors";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Event } from "../../types/eventTypes";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { selectAllCategories } from "../../store/categories/selectors";
import { fetchAllCategories } from "../../store/categories/actions";
import { filterEvents, searchEvents } from "../../store/events/actions";
import "./HomePage.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);
  const categories = useSelector(selectAllCategories);
  const [text, setText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const filteredEvents = useSelector(selectFilteredEvents);
  const searchedEvents = useSelector(selectSearchedEvents);

  useEffect(() => {
    dispatch(fetchAllEvents());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  function search(e: any) {
    e.preventDefault();
    dispatch(searchEvents(text));
  }

  return (
    <Box
      className="main-box"
      margin="1em auto"
      width="90%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border="1px solid #d1d1d1"
      borderRadius="1%"
    >
      <Typography
        className="title"
        gutterBottom
        variant="h4"
        component="div"
        style={{ margin: "2em", color: "#081c15" }}
      >
        Looking for something to do? find an event and join!
      </Typography>
      <Box style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <TextField
          className="search-box"
          id="filled-basic"
          label="search"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <Button
          variant="contained"
          style={{
            margin: "0 1em",
            color: "#aa0d00",
            backgroundColor: "white",
            fontWeight: "bold",
          }}
          onClick={search}
        >
          search
        </Button>

        <FormControl className="drop-down">
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="category"
          >
            {categories.map((category) => {
              return (
                <MenuItem
                  key={category.id}
                  value={category.title}
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory(category.title);
                    dispatch(filterEvents(category.id));
                  }}
                >
                  {category.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      {searchedEvents.length > 0 ? (
        <Box className="events-container">
          {searchedEvents.map((event: Event) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                imageUrl={event.imageUrl}
                description={event.description}
              />
            );
          })}
        </Box>
      ) : filteredEvents.length > 0 ? (
        <Box className="events-container">
          {filteredEvents.map((event: Event) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                imageUrl={event.imageUrl}
                description={event.description}
              />
            );
          })}
        </Box>
      ) : (
        <Box className="events-container">
          {" "}
          {events.map((event: Event) => {
            return (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                imageUrl={event.imageUrl}
                description={event.description}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}
