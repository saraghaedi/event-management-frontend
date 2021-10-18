import TicketCard from "../components/event/TicketCard";
import { selectUserEvents } from "../store/users/selectors";
import { useSelector } from "react-redux";
export default function MyTicketsPage() {
  const userEvents = useSelector(selectUserEvents);
  userEvents?.map((ue) => console.log(ue.event?.title));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        margin: "2em auto",
      }}
    >
      {userEvents?.map((userEvent) => {
        return (
          <TicketCard
            id={userEvent.event.id}
            title={userEvent.event.title}
            start_date={userEvent.event.start_date}
            end_date={userEvent.event.end_date}
            quantity={userEvent.quantity}
          />
        );
      })}
    </div>
  );
}
