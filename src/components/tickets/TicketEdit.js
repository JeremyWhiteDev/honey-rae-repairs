import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const TicketEdit = () => {
  const [ticket, updateTicket] = useState({
    description: "",
    emergency: false,
  });
  const { ticketId } = useParams();

  const navigate = useNavigate();

  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObject = JSON.parse(localHoneyUser);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/serviceTickets/${ticketId}`
      );
      const data = await response.json();
      updateTicket(data);
    };
    fetchData();
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    // TODO: Create the object to be saved to the API
    const object = { ...ticket, userId: honeyUserObject.id };

    // TODO: Perform the fetch() to POST the object to the API
    const postTicket = async () => {
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      };
      const response = await fetch(
        `http://localhost:8088/serviceTickets/${ticketId}`,
        fetchOptions
      );
      await response.json();
      navigate("/tickets");
    };
    postTicket();
  };

  return (
    <form className="ticketForm">
      <h2 className="ticketForm__title">New Service Ticket</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            value={ticket.description}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.description = evt.target.value;
              updateTicket(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Emergency:</label>
          <input
            type="checkbox"
            checked={ticket.emergency}
            value={ticket.emergency}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.emergency = evt.target.checked;
              updateTicket(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Update Ticket
      </button>
      <button
        onClick={(clickEvent) => navigate("/tickets")}
        className="btn btn-primary"
      >
        Cancel
      </button>
    </form>
  );
};
