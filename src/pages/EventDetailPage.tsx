import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { fetchEventsById } from "../store/events/actions";
import { selectEventdetails } from "../store/events/selectors";
import { useState } from "react";
const moment = require("moment");

export default function EventDetailsPage() {
  type Params = {
    id: string;
  };
  type Ticket = {
    amount: number;
  };
  const initialState = {
    amount: 1,
  };
  const [tickets, setTickets] = useState<Ticket>(initialState);
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
      <Box display="flex" justifyContent="space-evenly">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid 1px #3f51b5",
            borderRadius: "10px",
            backgroundColor: "#3f51b5",
            padding: "1em",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{ color: "white", padding: ".5em" }}
          >
            Event Info
          </Typography>
          <Typography
            component="p"
            style={{
              margin: "1em 0",
              color: "white",
            }}
          >
            Start Date:{" "}
            {moment(event?.start_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography
            component="p"
            style={{
              margin: "1em 0",
              color: "white",
            }}
          >
            End Date:{" "}
            {moment(event?.end_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography
            component="p"
            style={{
              margin: "1em 0",
              color: "white",
            }}
          >
            Capacity: {event.capacity}
          </Typography>

          {event.is_online ? (
            <Typography
              component="p"
              style={{
                margin: "1em 0",
                color: "white",
              }}
            >
              This is an online event
            </Typography>
          ) : null}

          <Typography
            component="p"
            style={{
              margin: "1em 0",
              color: "white",
            }}
          >
            Location : {event.location}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid 1px #3f51b5",
            borderRadius: "10px",

            padding: "1em",
          }}
        >
          <TextField
            style={{ margin: "1em 0", width: "100%" }}
            inputProps={{ min: "1", max: `${event.capacity}`, step: "1" }}
            id="Number of tickets"
            value={tickets.amount}
            onChange={(e) =>
              setTickets({
                amount: parseInt(e.target.value),
              })
            }
            label="Number of tickets"
            type="number"
          />
          <Typography
            component="p"
            style={{
              margin: "1em 0",
            }}
          >
            Price: {event.price! * tickets.amount} €
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
    </Box>
  );
}
