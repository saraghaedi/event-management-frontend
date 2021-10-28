import React from "react";
import { Box } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const moment = require("moment");

export default function TicketCard(props: any) {
  return (
    <div
      style={{
        margin: "1em 0",
        border: "solid 1px white",
        borderRadius: "10px",
        backgroundColor: "#74c69d",
        boxShadow: "10px 10px 5px",
        width: "30%",
      }}
    >
      <Box padding="1em">
        <Typography variant="body2" color="text.secondary">
          event name
        </Typography>
        <Typography variant="body2" color="text.primary">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          date
        </Typography>
        <Typography variant="body2" color="text.primary">
          start: {moment(props.start_date).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
        <Typography variant="body2" color="text.primary">
          end: {moment(props.end_date).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            number of tickets
          </Typography>
          <Typography variant="body2" color="text.primary">
            {props.quantity}
          </Typography>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={`events/${props.id}`}
          >
            <Button
              variant="contained"
              style={{
                margin: "1em 0",
                color: "#aa0d00",
                backgroundColor: "white",
              }}
            >
              {" "}
              go to event detail{" "}
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}
