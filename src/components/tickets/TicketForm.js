import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const TicketForm = () => {
  const [ticket, update] = useState({
    description: "",
    emergency: false,
  });

  const navigate = useNavigate();

  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObject = JSON.parse(localHoneyUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    // TODO: Create the object to be saved to the API
    const object = { ...ticket, userId: honeyUserObject.id };

    // TODO: Perform the fetch() to POST the object to the API
    const postTicket = async () => {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      };
      const response = await fetch(
        "http://localhost:8088/serviceTickets",
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
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Emergency:</label>
          <input
            type="checkbox"
            value={ticket.emergency}
            onChange={(evt) => {
              const copy = { ...ticket };
              copy.emergency = evt.target.checked;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit Ticket
      </button>
    </form>
  );
};
