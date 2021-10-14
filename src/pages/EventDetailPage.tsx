import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { fetchEventsById } from "../store/events/actions";
import { selectEventdetails } from "../store/events/selectors";

export default function EventDetailsPage() {
  type Params = {
    id: string;
  };
  const { id } = useParams<Params>();
  const event = useSelector(selectEventdetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEventsById(id));
  }, [dispatch, id]);

  return (
    <Box style={{ margin: "1em" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h2" component="div" gutterBottom>
          {event.title}
        </Typography>
      </div>
      {event.imageUrl ? (
        <img style={{ width: "50%" }} src={event.imageUrl} alt="eventImages" />
      ) : null}
      <Typography component="p" style={{ margin: "1em 0" }}>
        {event?.description}
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "solid 1px #3f51b5",
          borderRadius: "10px",
          backgroundColor: "#3f51b5",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          style={{ color: "white", padding: ".5em" }}
        >
          Join before deadline!!!
        </Typography>
        <Typography
          component="p"
          style={{
            margin: "1em 0",
            color: "white",
          }}
        >
          Start Date: {event?.start_date}
          <br />
          End Date: {event?.end_date}
          <br />
          Capacity: {event.capacity}
          <br />
          {event.is_online ? "Online Event" : null}
          Location : {event.location}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: "2em auto", display: "flex" }}
        >
          Buy ticket
        </Button>
      </div>
    </Box>
  );
}
