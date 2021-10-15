import { selectSpace } from "../store/users/selectors";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import EventCard from "../components/event/EventCard";
import { Event } from "../types/eventTypes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { selectAppLoading } from "../store/appState/selectors";

export default function SpaceDetailsPage() {
  const space = useSelector(selectSpace);

  //useEffect(() => {}, [space]);
  return (
    <Box style={{ margin: "1em" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2" component="div" gutterBottom>
          {space.title}
        </Typography>
        {space.logo_url ? (
          <img
            style={{ width: "20%" }}
            src={space.logo_url}
            alt={space.title}
          />
        ) : null}
      </div>
      <Typography component="p" style={{ margin: "1em 0" }}>
        {space?.description}
      </Typography>
      <Link to={`/${space.id}/newEvent`} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "2em auto", display: "flex" }}
        >
          Create a new event
        </Button>
      </Link>
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {space.events.map((event: Event) => {
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
    </Box>
  );
}
