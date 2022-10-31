import { Link } from "react-router-dom";

export const Ticket = ({ ticket, isStaff }) => {
  return (
    <>
      <section className="ticket">
        <header>
          {!isStaff ? (
            <Link to={`/tickets/${ticket.id}/edit`}>Ticket {ticket.id}</Link>
          ) : (
            `Ticket ${ticket.id}`
          )}
        </header>
        <section>{ticket.description}</section>
        <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
      </section>
    </>
  );
};
