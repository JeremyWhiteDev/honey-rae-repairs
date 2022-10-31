import { useEffect, useState } from "react";

export const EmployeeForm = ({ userObj }) => {
  const [profile, updateProfile] = useState({
    specialty: "",
    rate: 0,
    userId: 0,
  });
  const [feedback, setFeedback] = useState("");

  //

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/employees?userId=${userObj.id}`
      );
      const data = await response.json();
      const singleUser = data[0];
      updateProfile(singleUser);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (feedback !== "") {
      // Clear feedback to make entire element disappear after 3 seconds
      setTimeout(() => setFeedback(""), 3000);
    }
  }, [feedback]);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    console.log(profile);
    const putData = async (data) => {
      //declare fetchOptions
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      //fetch stringified entry obj
      const response = await fetch(
        `http://localhost:8088/employees/${profile.id}`,
        fetchOptions
      );
      //handle response
      setFeedback("Employee profile successfully saved");
    };
    putData(profile);
  };

  return (
    <>
      <div
        className={`${feedback.includes("Error") ? "error" : "feedback"} ${
          feedback === "" ? "invisible" : "visible"
        }`}
      >
        {feedback}
      </div>
      <form className="profile">
        <h2 className="profile__title">New Service Ticket</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="specialty">Specialty:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              value={profile.specialty}
              onChange={(evt) => {
                const formCopy = { ...profile };
                formCopy.specialty = evt.target.value;
                updateProfile(formCopy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Hourly rate:</label>
            <input
              type="number"
              className="form-control"
              value={profile.rate}
              onChange={(evt) => {
                const formCopy = { ...profile };
                formCopy.rate = parseFloat(evt.target.value, 2);
                updateProfile(formCopy);
              }}
            />
          </div>
        </fieldset>
        <button
          onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
          className="btn btn-primary"
        >
          Save Profile
        </button>
      </form>
    </>
  );
};
