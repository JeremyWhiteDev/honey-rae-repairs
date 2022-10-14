import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets.css";

export const TicketList = () => {
  const honeyrae_user = localStorage.getItem("honey_user");
  const localUser = JSON.parse(honeyrae_user);

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilter] = useState([]);
  const [emergency, setEmergency] = useState(false);
  const [onlyOpen, setOpenFilter] = useState(false);
  const navigate = useNavigate();

  //fetch data
  useEffect(
    () => {
      console.log("Initial state of tickets", tickets); // View the initial state of tickets
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8088/serviceTickets`);
        const ticketArray = await response.json();
        setTickets(ticketArray);
      };
      fetchData();
    },
    [] // When this array is empty, you are observing initial component state
  );

  //filter data based on employee/user
  useEffect(() => {
    //employee
    if (localUser.staff) {
      setFilter(tickets);
    } else {
      const myTickets = tickets.filter(
        (ticket) => ticket.userId === localUser.id
      );
      setFilter(myTickets);
    }
  }, [tickets]);

  //filter based on emergency
  useEffect(() => {
    if (emergency) {
      const emergencyTickets = tickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilter(emergencyTickets);
    } else {
      setFilter(tickets);
    }
  }, [emergency]);

  //filter based on status
  useEffect(() => {
    if (onlyOpen) {
      const openTickets = tickets.filter((ticket) => {
        return ticket.userId === localUser.id && ticket.dateCompleted === "";
      });
      setFilter(openTickets);
    } else {
      const myTickets = tickets.filter(
        (ticket) => ticket.userId === localUser.id
      );
      setFilter(myTickets);
    }
  }, [onlyOpen]);
  return (
    <>
      {localUser.staff ? (
        <>
          <button
            onClick={() => {
              setEmergency(true);
            }}
          >
            Emergency
          </button>
          <button
            onClick={() => {
              setEmergency(false);
            }}
          >
            All Tickets
          </button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/ticket/create")}>
            Create Ticket
          </button>
          <button onClick={() => setOpenFilter(true)}>Open Tickets</button>
          <button onClick={() => setOpenFilter(false)}>All My Tickets</button>
        </>
      )}

      <h2>List of Tickets</h2>
      <article className="tickets">
        {filteredTickets.map((ticket) => {
          return (
            <section key={ticket.id} className="ticket">
              <header>{ticket.description}</header>
              <footer>Emergency: {ticket.emergency ? "❗" : "No"}</footer>
            </section>
          );
        })}
      </article>
    </>
  );
};
