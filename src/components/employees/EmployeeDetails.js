import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Employee.css";

export const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, updateEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`
      );
      const data = await response.json();
      const singleEmployee = data[0];
      updateEmployee(singleEmployee);
    };
    fetchData();
  }, [employeeId]);

  return (
    <>
      <div className="employee">
        <h3>Name:{employee?.user?.fullName}</h3>
        <p>Specialty:{employee?.specialty}</p>
        <p>Rate:{employee?.rate}</p>
      </div>
    </>
  );
};
