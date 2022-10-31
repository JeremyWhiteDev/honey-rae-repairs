import { Outlet, Route, Routes } from "react-router-dom";
import { TicketList } from "../tickets/TicketList";
import { TicketForm } from "../tickets/TicketForm";
import { AboutUs } from "../aboutUs/aboutUs";
import { TicketContainer } from "../tickets/TicketContainer";
import { EmployeeViews } from "./EmployeeViews";
import { CustomerViews } from "./CustomerViews";

export const ApplicationViews = () => {
  const honeyrae_user = localStorage.getItem("honey_user");
  const localUser = JSON.parse(honeyrae_user);

  if (localUser.staff) {
    return <EmployeeViews />;
  } else {
    return <CustomerViews />;
  }
};
