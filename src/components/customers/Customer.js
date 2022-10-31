import { useEffect, useState } from "react";
import "./Customers.css";

export const Customer = ({ customer }) => {
  const [details, setDetails] = useState(false);

  const handleClick = () => {
    setDetails(!details);
  };

  if (details) {
    return (
      <>
        <div className="customer" onClick={(e) => handleClick()}>
          <h3>Name:{customer.user.fullName}</h3>
          <p>Address:{customer.address}</p>
          <p>Phone Number:{customer.address}</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="customer" onClick={(e) => handleClick()}>
          <h3>Name:{customer.user.fullName}</h3>
        </div>
      </>
    );
  }
};
