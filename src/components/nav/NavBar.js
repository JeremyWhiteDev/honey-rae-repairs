import { Link, useNavigate } from "react-router-dom";
import { EmployeeNav } from "./EmployeeNav";
import { CustomerNav } from "./CustomerNav";
import "./NavBar.css";

export const NavBar = () => {
  const honeyrae_user = localStorage.getItem("honey_user");
  const localUser = JSON.parse(honeyrae_user);

  if (localUser.staff) {
    return <EmployeeNav />;
  } else {
    return <CustomerNav />;
  }
};
