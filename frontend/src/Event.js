import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Modal from './Modal';

function CreateEvent() {
  const [title, settitle] = useState(""); 
  const [domain, setdomain] = useState("");
  const [date, setdate] = useState("");
  const [duration, setduration] = useState("");
  const [trainerName, settrainerName] = useState("");
  const [location, setlocation] = useState("");
  const [desc, setdesc] = useState("");
  const [events, setEvents] = useState([]);
  // const [index, setIndex] = useState(-1);
  // const [isEditable, setisEditable] = useState(false);
  
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/createevent', {
        title,
        domain,
        date,
        duration,
        trainerName,
        location,
        desc
      });
      console.log(response.data.savedTrainingEvent);

      if (response.status === 200) {
        alert('Created successful');
        setEvents([...events, response.data.savedTrainingEvent]);
        // Clear form fields after successful submission
        settitle("");
        setdomain("");
        setdate("");
        setduration("");
        settrainerName("");
        setlocation("");
        setdesc("");
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      console.error('Error Creating:', error);
    }
  };

  const handleedit = () => {
    
  }

  // const handleEditOpen = (event) => {
  //   setIndex(parseInt(event.target.value));
  //   setisEditable(true);
  // }

  // const handleUpdate = (event) => {
  //   const updateEvents = events;
  //   updateEvents[index] = event;
  //   setEvents(updateEvents);
  // }

  // const handleEditClose = (event) => {
  //   setisEditable(false);
  // }
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Create Event</h1>
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
        <div className="form-group">
          <label htmlFor="domain">Domain:</label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={domain}
            onChange={e => setdomain(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={e=>setdate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={e=>setduration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trainerName">Trainer Name:</label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            value={trainerName}
            onChange={e=>settrainerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={e => setlocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={desc}
            onChange={e => setdesc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>

      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Domain:</strong> {event.domain}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Duration:</strong> {event.duration}</p>
            <p><strong>Trainer Name:</strong> {event.trainerName}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.desc}</p>
            <Link to={`/editevent/${event._id}`}>
               <button >Edit</button>
            </Link>
           
            <button>Delete</button>
          </div>
        ))}
      </div>
      

      {/* {isEditable && <Modal onHandleEditClose={handleEditClose} onEventValue={events[index]} onHandleUpdate={handleUpdate} />} */}
    </div>
  );
}

export default CreateEvent;
