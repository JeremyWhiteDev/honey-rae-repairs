import { CustomerForm } from "./CustomerForm";
import { EmployeeForm } from "./EmployeeForm";

export const Profile = () => {
  const honeyrae_user = localStorage.getItem("honey_user");
  const localUser = JSON.parse(honeyrae_user);

  if (localUser.staff) {
    return <EmployeeForm userObj={localUser} />;
  } else {
    return <CustomerForm userObj={localUser} />;
  }
};
