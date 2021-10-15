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
    <div>
      <Typography
        gutterBottom
        variant="h4"
        component="div"
        style={{ margin: "2em" }}
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
              id={event.id}
              title={event.title}
              imageUrl={event.imageUrl}
              description={event.description}
            />
          );
        })}
      </Box>
    </div>
  );
}
