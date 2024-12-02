import React, { useState } from "react";
import "../../../assets/style/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email === "") {
      toast.error("Enter email address.", {
        position: "top-center",
      });
      return;
    }

    if (password === "") {
      toast.error("Enter password.", {
        position: "top-center",
      });
      return;
    }


    try {
      const response = await axios.post(
        "http://localhost:8087/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { user, user_token } = response.data;

        if (!user)
          throw new Error("User is not registered with the given credentials");

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_token", user_token);

        console.log("Login successful:", response.data);
        navigate(`/user/profile/${user.id}`);
      }
    } catch (err) {
      console.log("Login error:", err);

      // Check error response status for specific cases
      if (err.response?.status === 404) {
        toast.error("No account found with this email", {
          position: "top-center",
        });}

      else if (err.response?.status === 403) {
        toast.error("Your account is deactivated. Please contact support       kajal.bharambe@ksolves.com", {
          position: "top-center",
        });
      } else if (err.response?.status === 401) {
        toast.error("Invalid password",{
          position: "top-center",
        });
        setError("Invalid credentials");
      } else {
        toast.error("Login failed. Please try again.",{
          position: "top-center",
        });
        setError("Login failed. Please try again.",{
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="main-container">
      <div
        className="login-user-container"
        style={{ width: "600px" }}
      >
        <div className="logo">
          <img src="/path-to-your-logo" alt="Company Logo" />
        </div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <button type="submit">Login</button>

          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
