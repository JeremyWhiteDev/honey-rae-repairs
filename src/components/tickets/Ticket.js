import { Link, Navigate, useNavigate } from "react-router-dom";

export const Ticket = ({
  ticket,
  isStaff,
  employees,
  currentUser,
  getAllTickets,
}) => {
  let foundEmployee = null;
  const navigate = useNavigate();

  if (ticket.employeeTickets.length) {
    foundEmployee = employees.find(
      (employee) => employee.id === ticket.employeeTickets[0].employeeId
    );
  }

  //   console.log(currentUser);
  const currentEmployeeObj = employees.find((employee) => {
    return employee.userId === currentUser.id;
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

  const claimButtonVisibility = () => {
    if (isStaff) {
      return (
        <button
          id={`claim--${ticket.id}`}
          onClick={(eventClick) => handleClaim(eventClick)}
        >
          Claim Ticket
        </button>
      );
    } else {
      return "";
    }
  };

  //create an additonal button that is conditionally rendered for each ticket.

  //that button will have an onClick to finish a ticket.

  //if a ticket has a date completed string, than return finshed.
  //if not && current userId === ticket.userId then return a button for posting to database.

  const closeTicket = async () => {
    const copy = {
      dateCompleted: new Date(),
    };
    //declare fetchOptions
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(copy),
    };
    //fetch stringified entry obj
    const response = await fetch(
      `http://localhost:8088/serviceTickets/${ticket.id}`,
      fetchOptions
    );
    //handle response
    getAllTickets();
  };

  const finishButtonVisibility = () => {
    if (
      currentEmployeeObj?.id === foundEmployee?.id &&
      ticket.dateCompleted === ""
    ) {
      return <button onClick={() => closeTicket()}>finish</button>;
    } else {
      return "";
    }
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
            <p>Currently Being Worked On by {foundEmployee?.user?.fullName}</p>
          ) : (
            claimButtonVisibility()
          )}
          {finishButtonVisibility()}
        </footer>
      </section>
    </>
  );
};
