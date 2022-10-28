import { useEffect, useState } from "react";
import "./Employee.css";

export const Employee = ({ employee }) => {
  const [details, setDetails] = useState(false);

  const handleClick = () => {
    setDetails(!details);
  };

  if (details) {
    return (
      <>
        <div className="employee" onClick={(e) => handleClick()}>
          <h3>Name:{employee?.user?.fullName}</h3>
          <p>Specialty:{employee?.specialty}</p>
          <p>Rate:{employee?.rate}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="employee" onClick={(e) => handleClick()}>
          <h3>Name:{employee?.user?.fullName}</h3>
        </div>
      </>
    );
  }
};
