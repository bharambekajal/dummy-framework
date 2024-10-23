import {React,useState} from 'react'
import "../../../assets/style/Login.css";
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const{id,token} = useParams()

  const [password, setPassword] = useState('');
  const [error,setError] =useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    if (password === '') {
      setError('email is required!');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8087/api/user/reset-password/${id}/${token}`, {
        password
      }
      );
      
      if (response.status === 200) {
        const { user, user_token } = response.data;  

        if(!user) throw new Error('User is not register with the given cred');

        localStorage.setItem('user', JSON.stringify(user)); 
        localStorage.setItem('user_token', user_token);

        console.log('Login successful:', response.data);
        navigate(`/user/profile/${user.id}`);
      }
    } catch (err) {
      console.log('Login error:', err);
      if(err.status === 401) setError('Invalid credentials');
    }
  };

  return (
    <div className='main-container'>
    <div className="login-container">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>New Password :</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
        </div> */}

<div>
        <button type="submit">Update Password</button>
        {/* <p>Already have account
          <br></br>
          <Link to ="forgot-password">Forgot Password</Link></p> */}
</div>
      </form>
    </div>
    </div>
  );
};


export default ResetPassword
