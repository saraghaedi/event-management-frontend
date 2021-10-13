import EventCard from "../components/event/EventCard";
import { fetchAllEvents } from "../store/events/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectEvents } from "../store/events/selectors";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Event } from "../types/eventTypes";

export default function HomePage() {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <Box
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin: "1em",
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
  );
}
