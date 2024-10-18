import React, { useState } from 'react';
import "../../assets/style/LoginPage.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    if (email === '' || password === '') {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8087/api/user/login', {
        email,
        password,
      }
      );
      
      if (response.status === 200) {
        const { user, user_token } = response.data;  

        if(!user) throw new Error('User is not register with the given cred');

        localStorage.setItem('user', JSON.stringify(user)); 
        localStorage.setItem('user_token', user_token);

        console.log('Login successful:', response.data);
      }
    } catch (err) {
      console.log('Login error:', err);
      if(err.status === 401) setError('Invalid credentials');
    }
  };

  return (
    <div className='main-container'>
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div>

<div>
        <button type="submit">Login</button>
</div>
      </form>
    </div>
    </div>
  );
};

export default Login;
