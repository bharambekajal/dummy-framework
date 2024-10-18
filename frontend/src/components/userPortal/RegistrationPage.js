// components/RegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/style/RegistrationPage.css'; // Import the CSS

function RegistrationPage() {
  const { userId } = useParams(); // Get userId from URL
  const [userData, setUserData] = useState({ field1: '', field2: '',email: '' });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8087/api/user/get/${userId}`)
      .then((response) => {
        console.log('Fetched user data:', response.data);
        setUserData(response.data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userData.field1 || !userData.field2 || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const {data, status} = await axios.post('http://localhost:8087/api/user/register', {
        ...userData,
        password,
        confirmPassword
      });

      console.log('data', data)
      console.log('status', status)
      console.log('user_token', data.data.token)

    if (status === 201) {
       alert(`Please check the mail`)
      localStorage.setItem('user_token', data.data.token);
    }

    } catch (error) {
      console.error('Error submitting registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2>Complete Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Field 1:</label>
          <input
            type="text"
            value={userData.field1 || ''}
            onChange={(e) => setUserData({ ...userData, field1: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Field 2:</label>
          <input
            type="text"
            value={userData.field2 || ''}
            onChange={(e) => setUserData({ ...userData, field2: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={userData.email || ''}
            readOnly
            className="input-field"
            disabled
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationPage;