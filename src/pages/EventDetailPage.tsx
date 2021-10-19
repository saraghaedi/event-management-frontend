import * as React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { fetchEventsById } from "../store/events/actions";
import { selectEventdetails } from "../store/events/selectors";
import { useState } from "react";
import { buyTicket } from "../store/events/actions";
import { selectToken } from "../store/users/selectors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const moment = require("moment");

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const btn_style = {
//   margin: "2em auto",
//   display: "flex",
// };

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
  const token = useSelector(selectToken);

  //modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();

    dispatch(buyTicket(id, tickets.amount));
  }

  useEffect(() => {
    dispatch(fetchEventsById(id));
  }, [dispatch, id]);

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
        variant="h3"
        component="div"
        gutterBottom
        margin="1em 0"
        style={{ color: "white" }}
      >
        {event.title}
      </Typography>

      {event.imageUrl ? (
        <img
          style={{ width: "30%", borderRadius: "10%" }}
          src={event.imageUrl}
          alt="eventImages"
        />
      ) : null}
      <Typography component="p" style={{ margin: "1em 2em", color: "white" }}>
        {event?.description}
      </Typography>

      <Box display="flex" justifyContent="space-evenly" marginBottom="1em">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "solid 1px white",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "1em",
            margin: "0 1em",
            boxShadow: "10px 10px 5px",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            style={{ padding: ".5em" }}
          >
            Event Info
          </Typography>
          <Typography
            component="p"
            style={{
              margin: "1em 0",
            }}
          >
            Start Date:{" "}
            {moment(event?.start_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography
            component="p"
            style={{
              margin: "1em 0",
            }}
          >
            End Date:{" "}
            {moment(event?.end_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography
            component="p"
            style={{
              margin: "1em 0",
            }}
          >
            Capacity: {event.capacity}
          </Typography>

          {event.is_online ? (
            <Typography
              component="p"
              style={{
                margin: "1em 0",
              }}
            >
              This is an online event
            </Typography>
          ) : null}

          <Typography
            component="p"
            style={{
              margin: "1em 0",
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
            border: "solid 1px white",
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "10px 10px 5px",

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

          {!token ? (
            <div>
              <Typography variant="body2" color="text.secondary">
                Please login to continue!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "1em auto", display: "flex" }}
                disabled={true}
              >
                BUY TICKET
              </Button>
            </div>
          ) : event.capacity! < 1 ? (
            <div>
              <Typography variant="body2" color="text.secondary">
                SOLD OUT
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "1em auto", display: "flex" }}
                disabled={true}
              >
                BUY TICKET
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "2em auto", display: "flex" }}
                onClick={(e) => {
                  submitForm(e);
                  handleOpen();
                }}
              >
                BUY TICKET
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Successful
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Thank you for your purchase! You can find your ticket in "My
                    Tickets page"
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}
        </div>
      </Box>
    </Box>
  );
}
