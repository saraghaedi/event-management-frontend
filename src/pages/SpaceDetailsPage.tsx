import { selectSpaceId, selectSpace } from "../store/users/selectors";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import EventCard from "../components/event/EventCard";
import { Event } from "../types/eventTypes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchSpaceById } from "../store/users/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  btn: {
    // marginLeft: "1vw",
    fontWeight: "bold",
    color: "#aa0d00",
    backgroundColor: "#ffffff",
    "&:hover": {
      color: "#000000",
      backgroundColor: "#ffa000",
    },
  },
}));

export default function SpaceDetailsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const spaceId = useSelector(selectSpaceId);
  const space = useSelector(selectSpace);

  useEffect(() => {
    dispatch(fetchSpaceById(spaceId));
  }, [dispatch, spaceId]);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "96%",
          margin: "1em",
          padding: "1em",
        }}
      >
        <Box display="flex" flexDirection="column" margin="1em">
          <Typography
            variant="h2"
            component="div"
            gutterBottom
            style={{ color: "white" }}
          >
            {space.title}
          </Typography>
          <Typography component="p" style={{ margin: "1em 0", color: "white" }}>
            {space?.description}
          </Typography>
        </Box>
        {space.logo_url ? (
          <img
            style={{ width: "20%", borderRadius: "15%" }}
            src={space.logo_url}
            alt={space.title}
          />
        ) : null}
      </div>

      <Link
        to={`/${space.id}/new-event`}
        style={{ textDecoration: "none", padding: "1em" }}
      >
        <Button className={classes.btn}>Create a new event</Button>
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
