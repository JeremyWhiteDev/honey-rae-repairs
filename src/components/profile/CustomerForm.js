import { useEffect, useState } from "react";

export const CustomerForm = ({ userObj }) => {
  const [profile, updateProfile] = useState({
    address: "",
    phoneNumber: "",
    userId: 0,
  });
  const [feedback, setFeedback] = useState("");

  //

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8088/customers?userId=${userObj.id}`
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
        `http://localhost:8088/customers/${profile.id}`,
        fetchOptions
      );
      //handle response
      setFeedback("Customer profile successfully saved");
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
        <h2 className="profile__title">Change Profile Settings</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="specialty">Address:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              value={profile.address}
              onChange={(evt) => {
                const formCopy = { ...profile };
                formCopy.address = evt.target.value;
                updateProfile(formCopy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              value={profile.phoneNumber}
              onChange={(evt) => {
                const formCopy = { ...profile };
                formCopy.phoneNumber = evt.target.value;
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
