import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tickets.css";

export const TicketList = ({ getterSearchTerms }) => {
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

  useEffect(() => {
    const searchedTickets = tickets.filter((ticket) => {
      return ticket.description
        .toLowerCase()
        .startsWith(getterSearchTerms.toLowerCase());
    });
    setFilter(searchedTickets);
  }, [getterSearchTerms]);

  //filter data based on employee/user
  useEffect(() => {
    //employee
    if (localUser.staff && tickets.length) {
      console.log("useEffect/setFilter to:" + tickets);
      setFilter(tickets);
    } else if (tickets.length) {
      const myTickets = tickets.filter(
        (ticket) => ticket.userId === localUser.id
      );
      setFilter(myTickets);
    }
  }, [tickets]);
  console.log("change1Energency2");
  //filter based on emergency
  useEffect(() => {
    if (emergency && tickets.length) {
      console.log("change2");
      const emergencyTickets = tickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFilter(emergencyTickets);
    } else if (tickets.length) {
      console.log("change3  ");
      setFilter(tickets);
    }
  }, [emergency]);

  console.log("change1Status");
  //filter based on status
  useEffect(() => {
    if (onlyOpen) {
      const openTickets = tickets.filter((ticket) => {
        return ticket.userId === localUser.id && ticket.dateCompleted === "";
      });
      setFilter(openTickets);
    } else if (tickets.length) {
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
