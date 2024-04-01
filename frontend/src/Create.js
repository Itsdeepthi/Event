import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [emailID, setEmailID] = useState("");
  const [role, setrole] = useState("");
  const [fullName, setfullName] = useState("");
  const [username, setusername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [department, setdepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
                      .post('http://localhost:5000/create', 
                      {emailID, role, fullName, username, phoneNumber, department});
      if (response.status === 200) {
        alert('Created successful');
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      console.error('Error Creatin:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Create User</h1>
      </header>
      <form onSubmit={handleSubmit} className="user-form">
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
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={e => setfullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e=>setusername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={e=>setphoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={e=>setdepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={e => setrole(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Create;
