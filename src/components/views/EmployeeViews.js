import { Outlet, Route, Routes } from "react-router-dom";
import { TicketList } from "../tickets/TicketList";
import { TicketForm } from "../tickets/TicketForm";
import { AboutUs } from "../aboutUs/aboutUs";
import { TicketContainer } from "../tickets/TicketContainer";
import { EmployeeList } from "../employees/EmployeeList";
import { CustomerList } from "../customers/CustomerList";
import { EmployeeDetails } from "../employees/EmployeeDetails";

export const EmployeeViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Honey Rae Repair Shop</h1>
            <div>Your one-stop-shop to get all your electronics fixed</div>
            <AboutUs />
            <Outlet />
          </>
        }
      >
        <Route path="tickets" element={<TicketContainer />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="customers" element={<CustomerList />} />

        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
      </Route>
    </Routes>
  );
};
