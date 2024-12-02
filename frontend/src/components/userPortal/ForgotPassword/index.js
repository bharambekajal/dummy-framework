import React, { useState } from "react";
import "../../../assets/style/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email === "") {
      toast.error("Email is required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8087/api/user/forgot-password",
        { email }
      );

      if (response.status === 404) {
        toast.error("User is not registered with the given credentials");
        return;
      }

      if (response.status === 200) {
        toast.success("Reset email sent",{
          position: "top-center",
        },)
        const { user, user_token } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_token", user_token);

        navigate(`/user/profile/${user.id}`);
      }
    } catch (err) {
      console.log("Login error:", err);
      if (err.response && err.response.status === 404) {
        toast.error("Email not registered",{position:"top-center"});
      } 
    }
  };

  return (
    <div className="main-container">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
