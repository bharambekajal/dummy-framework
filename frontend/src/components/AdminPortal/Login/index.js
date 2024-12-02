import React, { useState } from "react";
import "../../../assets/style/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(email === '' && password === ''){
      toast.error("Email & Password is required!", { position: "top-center" });
      return;
    }

    if (email === "") {
      toast.error("Email is required!", { position: "top-center" });
      return;
    }

    if (password === "") {
      toast.error("Password is required!", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8087/api/admin/login",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        const { user, token } = response.data.data;

        if (!user)
          throw new Error("User is not registered with the given credentials");
        if (!token) throw new Error("Incorrect password");

        // Store user data and token in localStorage
        localStorage.setItem("admin", JSON.stringify(user));
        localStorage.setItem("admin_token", token);

        console.log("Login successful!");
        // Navigate on successful login
        navigate("/admin/dashboard/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 404) {
        toast.error("No account found with this email!", {
          position: "top-center",
        });}
        else if (err.response?.status === 401) {
          toast.error("Invalid password", {
            position: "top-center",
          });
      } else {
        toast.error("Invalid credentials!", { position: "top-center" });
      }
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
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
