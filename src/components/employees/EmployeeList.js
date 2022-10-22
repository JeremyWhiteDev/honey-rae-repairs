import { useEffect, useState } from "react";
import "./Employee.css";

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8088/users?isStaff=true`);
      const data = await response.json();
      setEmployees(data);
    };
    fetchData();
  }, []);

  return (
    <section className="employees">
      {employees.map((employee) => {
        return (
          <div className="employee" key={`employee--${employee.id}`}>
            <p>{employee.fullName}</p>
            <p>{employee.email}</p>
          </div>
        );
      })}
    </section>
  );
};
