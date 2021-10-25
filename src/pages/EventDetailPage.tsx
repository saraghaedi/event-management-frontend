import * as React from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { fetchEventsById } from "../store/events/actions";
import { selectEventdetails } from "../store/events/selectors";
import { useState } from "react";
import { buyTicket } from "../store/events/actions";
import { selectToken, selectSpaceId } from "../store/users/selectors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UserAttendanceTable from "../components/general/UserAttendanceTable";
import { fetchEventUserAttendance } from "../store/events/actions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
  const spaceId = useSelector(selectSpaceId);

  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleSubmitOrder() {
    console.log("I got here");
    // e.preventDefault();
    dispatch(buyTicket(id, tickets.amount));
  }

  useEffect(() => {
    dispatch(fetchEventsById(id));
    dispatch(fetchEventUserAttendance(id));
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
      ) : (
        <img
          style={{ width: "30%", borderRadius: "10%" }}
          src="https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg"
          alt="eventImages"
        />
      )}
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
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AZuyRCHRciB_LH7YSK28AvXzZo_95VuPQwGk9PjSm0hhVJCf10Yvaz8DE-ujRcErC-PzJI9Scmj-h7yt",
                  currency: "EUR",
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "horizontal",
                    shape: "pill",
                    color: "black",
                    label: "pay",
                    tagline: false,
                    height: 50,
                  }}
                  // @ts-ignore
                  onApprove={(event) => {
                    handleSubmitOrder();
                    handleOpen();
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: (event.price! * tickets.amount).toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                />
              </PayPalScriptProvider>

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
        {spaceId === event.spaceId ? <UserAttendanceTable /> : <></>}
      </Box>
    </Box>
  );
}
