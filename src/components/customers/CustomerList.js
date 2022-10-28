import { useEffect, useState } from "react";
import { Customer } from "./Customer";
import "./Customers.css";

export const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/customers?_expand=user`
      );
      const data = await response.json();
      setCustomers(data);
    };
    fetchData();
  }, []);

  return (
    <section className="customers">
      {customers.map((customer) => {
        return (
          <Customer key={`customer--${customer.id}`} customer={customer} />
        );
      })}
    </section>
  );
};
