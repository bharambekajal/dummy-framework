// components/RegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../..//assets/style/SignUp.css'; // Import the CSS

function SignUp() {
  const { userId } = useParams(); // Get userId from URL
  const [userData, setUserData] = useState({ field1: '', field2: '',number: '',email: '' });
  const [field3, setField3] = useState('');
//  const [field4, setField4] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        field3,
        password,
        confirmPassword
      });

      console.log('data', data)
      console.log('status', status)
      console.log('user_token', data.data.token)

      if (status === 201) {
        // alert(`Email is sent to ${email}`);
        localStorage.setItem('user_token', data.data.token);
        resetForm();
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email already exists');
      }
    }
  };
  const resetForm = () => {
    setUserData((prevData) => ({
      ...prevData,  // Keep the email unchanged
      field1: '',
      field2: '',
      number: '',
    }));
    setField3('');
    setPassword('');
    setConfirmPassword('');
    setError('');  // Reset error message
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
          <label>Number :</label>
          <input
            type="text"
            value={userData.number || ''}
            onChange={(e) => setUserData({ ...userData, number: e.target.value })}
            className="input-field"
          />
        </div>
    
         <div className="input-group">
          <label>Field 3:</label>
          <input
            type="text"
            value={field3}
            onChange={(e) => setField3(e.target.value)}
            required
            className="input-field"
          />
        </div>
{/* 
        <div className="input-group">
          <label>Field 4:</label>
          <input
            type="text"
            value={field4}
            onChange={(e) => setField4(e.target.value)}
            required
            className="input-field"
          />
        </div> */}

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

        <div className="button-group">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="reset-button" onClick={resetForm}>
            Reset
          </button>
          </div>
      </form>
    </div>
  );
}

export default SignUp;