import { Link } from "react-router-dom";

export const Ticket = ({ ticket, isStaff, employees }) => {
  let foundEmployee = null;

  if (ticket.employeeTickets.length) {
    foundEmployee = employees.find(
      (employee) => employee.id === ticket.employeeTickets[0].employeeId
    );
  }

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
        <footer>
          <p>Emergency: {ticket.emergency ? "🧨" : "No"}</p>
          {ticket.employeeTickets.length ? (
            <p>Currently Being Workied On by {foundEmployee.user?.fullName}</p>
          ) : (
            <button>Claim Ticket</button>
          )}
        </footer>
      </section>
    </>
  );
};
