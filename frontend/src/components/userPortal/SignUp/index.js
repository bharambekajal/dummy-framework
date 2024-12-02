import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../..//assets/style/SignUp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    state: "",
    number: "",
    email: "",
  });
  const [originalData, setOriginalData] = useState({
    name: "",
    state: "",
    number: "",
    city: "",
    occupation: "",
    email: "",
  });
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    axios
    .get(`http://localhost:8087/api/user/get/${userId}`)
    .then((response) => {
      setUserData(response.data);
      setCity(response.data.city || ""); // set prefilled city
      setOccupation(response.data.occupation || ""); // set prefilled occupation
      setOriginalData(response.data); // store original data for comparison
    })
    .catch((error) => console.error("Error fetching user data:", error));
}, [userId]);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const hasUpdates =
      userData.name !== originalData.name ||
      userData.state !== originalData.state ||
      userData.number !== originalData.number 

 
    if (!userData.name || !userData.state || !password || !confirmPassword) {
      toast.error("All fields are required.", { position: "top-center" });
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    } else {
      setPasswordError("");
    }
  
    try {
      const { data, status } = await axios.post(
        "http://localhost:8087/api/user/register",
        {
          ...userData,
          city,
          occupation,
          password,
          confirmPassword,
          is_updated: hasUpdates, // Save `true` if any field has been updated
        }
      );
  
      if (status === 201) {
        toast.success(`Check email for login`, { position: "top-center" });
        localStorage.setItem("user_token", data.data.token);
        resetForm();
      }else {
        toast.error("Failed to save data", { position: "top-center" });
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists", { position: "top-center" });
      }else if(error.response.status===400){
        toast.error("Passwords should match", { position: "top-center" });
        setPasswordError(
          "Password should be"
        );
      }
    }
  };

  const resetForm = () => {
    setUserData((prevData) => ({
      ...prevData,
      name: "",
      state: "",
      number: "",
    }));
    setCity("");
    setOccupation("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <div className="main-container">
      <div className="registration-container">
        <h2>Registration</h2>
        <br />
        <form onSubmit={handleSubmit} className="row g-3 form">

          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">State</label>
            <input
              type="text"
              value={userData.state || ""}
              onChange={(e) =>
                setUserData({ ...userData, state: e.target.value })
              }
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Occupation</label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={userData.email || ""}
              readOnly
              className="form-control"
              disabled
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Number</label>
            <input
              type="text"
              value={userData.number || ""}
              onChange={(e) =>
                setUserData({ ...userData, number: e.target.value })
              }
              className="form-control"
            />
          </div>
         
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          {passwordError && (
              <div className="text-danger mt-2">{passwordError}</div>
            )}
          <div className="col-12 button-group gap-5">
            <button
              type="submit"
              className="submit-button"
              style={{ width: "220px", marginLeft: "40px" }}
            >
              Submit
            </button>
            <button 
              type="button" 
              className="reset-button"   
              style={{ width: "220px", marginRight: "40px" }}
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default SignUp;
