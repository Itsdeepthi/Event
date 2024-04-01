import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Changepass = () => {
    const emailID = new URLSearchParams(useLocation().search).get('emailID');
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        axios.post('http://localhost:5000/update', {emailID, newpassword: password})
            .then((res) => {
                if(res.status === 200) alert('Updated Password');
            })
            .catch(err => {
                console.log(err);
            })
    }

  return (
    <div>
        <header className="App-header">
        <h1>Change Password</h1>
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Change Password</button>
      </form>
    </div>
  )
}

export default Changepass