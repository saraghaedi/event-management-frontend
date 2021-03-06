import TicketCard from "../../components/event/TicketCard";
import { selectUserEvents } from "../../store/users/selectors";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/users/selectors";
import AuthModal from "../../components/auth/AuthModal";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./MyTicketsPage.css";

export default function MyTicketsPage() {
  const userEvents = useSelector(selectUserEvents);
  const token = useSelector(selectToken);

  return (
    <div>
      {!token ? (
        <div>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            margin="1em"
          >
            <Typography variant="h3" component="div" gutterBottom>
              Tickets
            </Typography>
            <Typography variant="h5" component="div" gutterBottom>
              You can see your tickets in this page! please login first to see
              your tickets.
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <AuthModal />
            </Box>
          </Box>
        </div>
      ) : userEvents?.length! > 0 ? (
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
          {userEvents?.map((userEvent) => {
            return (
              <TicketCard
                key={userEvent.event.id}
                id={userEvent.event.id}
                title={userEvent.event.title}
                start_date={userEvent.event.start_date}
                end_date={userEvent.event.end_date}
                quantity={userEvent.quantity}
              />
            );
          })}
        </Box>
      ) : (
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          style={{ margin: "1em" }}
        >
          You have no tickets yet! Go to your home page and find an exciting
          event to join!
        </Typography>
      )}
    </div>
  );
}
