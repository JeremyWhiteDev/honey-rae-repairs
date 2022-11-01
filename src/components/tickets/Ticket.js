import { Link, Navigate, useNavigate } from "react-router-dom";

export const Ticket = ({
  ticket,
  isStaff,
  employees,
  userId,
  getAllTickets,
}) => {
  let foundEmployee = null;
  const navigate = useNavigate();

  if (ticket.employeeTickets.length) {
    foundEmployee = employees.find(
      (employee) => employee.id === ticket.employeeTickets[0].employeeId
    );
  }
  const currentEmployeeObj = employees.find((employee) => {
    return employee.userId === userId;
  });

  const handleClaim = (click) => {
    const [, ticketId] = click.target.id.split("--");

    const employeeTicket = {
      employeeId: currentEmployeeObj.id,
      serviceTicketId: parseInt(ticketId),
    };
    //this is going to post something to the database.

    const postData = async (data) => {
      //declare fetchOptions
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      //fetch stringified entry obj
      const response = await fetch(
        `http://localhost:8088/employeeTickets`,
        fetchOptions
      );
      //handle response
    };
    postData(employeeTicket);
    //that is going to have the employee id from local storage
    //serviceTicket Id.
    getAllTickets();
  };

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
            <button
              id={`claim--${ticket.id}`}
              onClick={(eventClick) => handleClaim(eventClick)}
            >
              Claim Ticket
            </button>
          )}
        </footer>
      </section>
    </>
  );
};
