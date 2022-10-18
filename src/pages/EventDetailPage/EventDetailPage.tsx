import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import UserAttendanceTable from "../../components/general/UserAttendanceTable";
import {
  buyTicket,
  fetchEventsById,
  fetchEventUserAttendance,
} from "../../store/events/actions";
import { selectEventdetails } from "../../store/events/selectors";
import { selectSpaceId, selectToken } from "../../store/users/selectors";
import "./EventDetailPage.css";
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
    // e.preventDefault();
    dispatch(buyTicket(id, tickets.amount));
  }

  useEffect(() => {
    dispatch(fetchEventsById(id));
    if (token) {
      dispatch(fetchEventUserAttendance(id));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (event.id) {
      (window as any).dataLayer.push({
        event: "detailPageView",
        eventId: event.id,
        price: event.price,
        capacity: event.capacity,
      });
    }
  }, [event]);

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
      className="main-box"
    >
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        margin="1em 0"
        style={{ color: "rgb(8, 28, 21)" }}
      >
        {event.title}
      </Typography>

      {event.imageUrl ? (
        <img className="image" src={event.imageUrl} alt="eventImages" />
      ) : (
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg"
          alt="eventImages"
        />
      )}
      <Typography component="p" className="desc" margin="1em 2em">
        {event?.description}
      </Typography>

      <Box display="flex" justifyContent="space-evenly" marginBottom="1em">
        <div className="info-box">
          <Typography variant="h5" component="div" gutterBottom padding=".5em">
            Event Info
          </Typography>
          <Typography component="p" margin="1em 0">
            Start Date:{" "}
            {moment(event?.start_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography component="p" margin="1em 0">
            End Date:{" "}
            {moment(event?.end_date).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography component="p" margin="1em 0">
            Capacity: {event.capacity}
          </Typography>

          {event.is_online ? (
            <Typography component="p" margin="1em 0">
              This is an online event
            </Typography>
          ) : null}

          <Typography component="p" margin="1em 0">
            Location : {event.location}
          </Typography>
        </div>
        <div className="info-box" id="info-box">
          <TextField
            className="ticket-nu"
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
          <Typography component="p" margin="1em 0">
            Price: {event.price! * tickets.amount} €
          </Typography>

          {!token ? (
            <div>
              <Typography variant="body2" color="text.secondary">
                Please login to continue!
              </Typography>
              <Button
                className="buy-btn"
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
        {token && spaceId === event.spaceId ? <UserAttendanceTable /> : <></>}
      </Box>
    </Box>
  );
}
