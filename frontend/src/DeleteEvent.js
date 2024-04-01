import React, { useState } from 'react';
import axios from 'axios';

function DeleteEvent() {
    const [title, settitle] = useState(""); 
    
  const [events, setEvents] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/deleteevent', {
        title
      });
      console.log(response.data.savedTrainingEvent);

      if (response.status === 200) {
        alert('Created successful');
        setEvents([...events, response.data.savedTrainingEvent]);
        // Clear form fields after successful submission
        settitle("");
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      console.error('Error Creating:', error);
    }
  };
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Edit Event</h1>
      </header>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => settitle(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Delete</button>
      </form>

      
       </div>
  );
}

export default DeleteEvent;
