import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Employee.css";

export const Employee = ({ employee }) => {
  return (
    <>
      <Link to={`/employees/${employee.user.id}`}>
        <div className="employee">
          <h3>Name:{employee?.user?.fullName}</h3>
          <p>Specialty: {employee.specialty}</p>
        </div>
      </Link>
    </>
  );
};
