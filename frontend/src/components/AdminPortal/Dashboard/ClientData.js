import React, { useState, useEffect } from "react";
import "../../../assets/style/ClientData.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClientData({ isEditMode = false, selectedUser, onCancel,onUserUpdate ,action }) {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [errors, setErrors] = useState({});

  const baseUrl = "http://localhost:8087/api/screens/";  

  const endpoint = action === "draft" ? `${baseUrl}update` : `${baseUrl}user-draft`;

  useEffect(() => {
    if (isEditMode && selectedUser) {
      setName(selectedUser.name || "");
      setState(selectedUser.state || "");
      setNumber(selectedUser.number || "");
      setEmail(selectedUser.email || "");
      setCity(selectedUser.city || "");
      setOccupation(selectedUser.occupation || "");
    }
  }, [isEditMode, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name || "");
      setState(selectedUser.state || "");
      setNumber(selectedUser.number || "");
      setEmail(selectedUser.email || "");
    }
  }, [selectedUser]);

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!state.trim()) newErrors.state = "State is required";

    if (!isEditMode && !number.trim()) {
      newErrors.number = "Number is required";
    } else if (number && !/^\d{10,}$/.test(number)) {
      newErrors.number = "Phone number must contain at least 10 digits";
      toast.error("Phone number must contain 10 digits", { position: "top-center" });
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email must be a valid email address";
      toast.error("Email must be a valid email address", { position: "top-center" });
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSaveDraft = async () => {
    const draftData = { name, state, number, email, city, occupation, isDraft: true };
    try {
      const response = await axios.post(
        "http://localhost:8087/api/screens/user-draft",
        draftData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } }
      );
      
      // Check for custom status in response data
      if (response.data.status === "success") {
        toast.success("Draft saved successfully!", { position: "top-center" });
        onCancel();
        onUserUpdate(response.data); 
      } 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists", { position: "top-center" });
      }
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) return;
  
    const requestData = { name, state, number, email, city, occupation, isDraft: false };  
      const url =  selectedUser ? `${endpoint}/${selectedUser.id}` : endpoint;


    try {
      const response =  selectedUser
        ? await axios.put(
            url,
            requestData,
            { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } }
          )
        : await axios.post(
            "http://localhost:8087/api/screens/user-draft",
            requestData,
            { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } }
          );
  
      if (response.status === 200 || response.status === 201) {
        toast.success(isEditMode ? "Details updated successfully!" : "Email Send!", { position: "top-center" });
        resetForm();
        onCancel();
  
        onUserUpdate(response.data);
      

      } 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Email already exists", { position: "top-center" });
      }
    }
  };

  const resetForm = () => {
    setName("");
    setState("");
    setNumber("");
    setEmail("");
    setCity("");
    setOccupation("");
    setErrors({});
  };

  return (
    <div className="main-container">
      <div className="login-user-container">
        <h2>{isEditMode ? "Edit Details" : "Add Details"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label>State :</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter State"
            />
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>

          <div className="input-group">
            <label>Number :</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
            {errors.number && <span className="error-text">{errors.number}</span>}
          </div>

          <div className="input-group">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {isEditMode && (
            <>
              <div className="input-group">
                <label>City :</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter City"
                />
              </div>

              <div className="input-group">
                <label>Occupation :</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Enter Occupation"
                />
              </div>
            </>
          )}

          <div className="button-group">
            <button type="submit" className="submit-button">
              {isEditMode ? "Update" : "Submit"}
            </button>
             
             
  {!isEditMode && action !== "draft" && (
    <button type="button" className="draft-button" onClick={handleSaveDraft}>
      Save Draft
    </button>
  )}
            <button type="button" className="reset-button" onClick={resetForm}>
            {isEditMode ?  "Reset":"Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientData;