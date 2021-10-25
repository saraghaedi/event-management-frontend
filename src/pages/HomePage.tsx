import EventCard from "../components/event/EventCard";
import { fetchAllEvents } from "../store/events/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectAllEvents } from "../store/events/selectors";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Event } from "../types/eventTypes";
import Typography from "@mui/material/Typography";
export default function HomePage() {
  const dispatch = useDispatch();
  const events = useSelector(selectAllEvents);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <Box
      margin="1em auto"
      width="90%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      border="1px solid #d1d1d1"
      borderRadius="1%"
      style={{ backgroundColor: "#3f51b5", boxShadow: "10px 10px 5px grey" }}
    >
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        style={{ margin: "2em", color: "white" }}
      >
        Looking for something to do? find an event and join!
      </Typography>

      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "1em 10px",
        }}
      >
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
    </Box>
  );
}
