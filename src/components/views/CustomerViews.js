import { Outlet, Route, Routes } from "react-router-dom";
import { TicketList } from "../tickets/TicketList";
import { TicketForm } from "../tickets/TicketForm";
import { AboutUs } from "../aboutUs/aboutUs";
import { TicketContainer } from "../tickets/TicketContainer";

export const CustomerViews = () => {
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
        <Route path="tickets" element={<TicketList />} />
      </Route>
    </Routes>
  );
};
