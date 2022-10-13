import { useEffect, useState } from "react";
import "./Tickets.css";

export const TicketList = () => {
  const honeyrae_user = localStorage.getItem("honey_user");
  const localUser = JSON.parse(honeyrae_user);

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilter] = useState([]);

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
  return (
    <>
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
