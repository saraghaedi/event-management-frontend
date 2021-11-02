import { selectSpaceId, selectSpace } from "../../store/users/selectors";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import EventCard from "../../components/event/EventCard";
import { Event } from "../../types/eventTypes";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchSpaceById } from "../../store/users/actions";
import { useDispatch } from "react-redux";
import "./SpaceDetailsPage.css";

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
      <div className="header-container">
        <Box display="flex" flexDirection="column" margin="1em">
          <Typography
            variant="h2"
            component="div"
            gutterBottom
            style={{ color: "rgb(8, 28, 21)" }}
          >
            {space.title}
          </Typography>
          <Typography
            component="p"
            style={{ margin: "1em 0", color: "rgb(8, 28, 21)" }}
          >
            {space?.description}
          </Typography>
        </Box>
        {space.logo_url ? (
          <img className="image" src={space.logo_url} alt={space.title} />
        ) : null}
      </div>

      <Link className="new-event-link" to={`/${space.id}/new-event`}>
        <Button className={classes.btn}>Create a new event</Button>
      </Link>
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
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
