import { useEffect, useState } from "react";
import { Employee } from "./Employee";
import "./Employee.css";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/employees?_expand=user&_embed=employeeTickets`
      );
      const data = await response.json();
      setEmployees(data);
    };
    fetchData();
  }, []);

  return (
    <section className="employees">
      {employees.map((employee) => {
        return (
          <Employee key={`employee--${employee.id}`} employee={employee} />
        );
      })}
    </section>
  );
};
