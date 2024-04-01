import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', {emailID, password});
      if (response.status === 200) {
        alert('Login successful');
        navigate('/create');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const onForgetClicked = async () => {
    axios
      .get('http://localhost:5000/sendmail', {params: {requestingUser: emailID}})
      .then((res) => {
        if(res.status === 200)
          alert('Mail Sent!');
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
      </header>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailID}
            onChange={e => setEmailID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <button onClick={() => {
          onForgetClicked();
        }}>Forget pw</button>
    </div>
  );
}

export default Login;
