import { React, useState } from "react";
import "../../../assets/style/Login.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { id, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // New state for password validation error

  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Password regex to validate lowercase, uppercase, number, special character, and length of at least 8 characters
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordError(""); // Reset password error

    // Check if both passwords match
    if (password === "") {
      setError("Password is required!");
      return;
    }

    if (confirmPassword === "") {
      setError("Confirm password is required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8087/api/user/reset-password/${id}/${token}`,
        {
          password,
        }
      );

      if (response.status === 200) {
        toast.success("Password updated");
        const { user, user_token } = response.data;

        if (!user) throw new Error("User is not registered with the given credentials");

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("user_token", user_token);

        console.log("Password reset successful:", response.data);
        navigate(`/user/profile/${user.id}`);
      }
    } catch (err) {
      console.log("Error during password reset:", err);
      if (err.status === 401) setError("Invalid credentials");
      else setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="main-container"
      style={{ marginTop: "280px", marginLeft: "650px", width: "600px" }}
    >
      <div className="login-container">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        {passwordError && <p className="error">{passwordError}</p>} {/* Display password validation error */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>New Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password :</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <button type="submit">Update Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
