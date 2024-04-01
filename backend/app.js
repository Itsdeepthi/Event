const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const TrainingEvent = require('./models/event');

const nodemailer = require('nodemailer');
 
const app = express();
 
app.use(cors());
app.use(express.json());

const crypto = require('crypto');

const SECRET_KEY = crypto.randomBytes(64).toString('hex');

mongoose.connect('mongodb+srv://itsmedeepthi02:QuOSLCsZVe8QsPQG@final.qhq9jgy.mongodb.net/Final')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



app.get('/sendmail',async (req,res)=>{
  const requestingUser = req.query.requestingUser;

  const link = `http://localhost:3000/changepassword?emailID=${encodeURIComponent(requestingUser)}`

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: "nadiminti@jmangroup.com",  // Replace with your email
      pass: "Jman@600113"
    }
  });
  
  const mailOptions = {
    from: "nadiminti@jmangroup.com",
    to: requestingUser,
    subject: 'Login Successful',
    text: `change password here: ${link}`
  };

  await transporter.sendMail(mailOptions);
  return res.status(200).send('Sent Mail');
})

app.get('/api/users/first', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }   
});

app.post('/login', async (req, res) => {
    const { emailID, password } = req.body;
    console.log(req.body)
    // username="deeps"
    try {
      const user = await User.findOne({ emailID });
      console.log(user);
  
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          SECRET_KEY,
          { expiresIn: '1h' }
        );
        res.status(200).json({ token });
      } else {
        res.status(401).send('Login failed');
      }
    } catch (error) {
      console.error('Error loogging in:', error);
      res.status(500).send('Server error');
    }
  });

app.post('/create', async (req,res) => {
  try {
    const {emailID, role, fullName, username, phoneNumber, department } = req.body;

    const password = 'default';
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      emailID: emailID.toLowerCase(),
      role, 
      fullName, 
      username, 
      phoneNumber, 
      department,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    console.log("User Registered Successfully");
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.post('/update', async (req, res) => {
  const { emailID, newpassword } = req.body;

  try {
    const user = await User.findOne({ emailID });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newpassword, salt);
    await user.save();

    return res.status(200).send('User Saved successfully!');
  } catch (error) {
    console.error('Error loogging in:', error);
    return res.status(500).send('Server error');
  }
});

// app.post('/createevent', async (req, res) => {
//   try {
//     const {title, domain, date, duration, trainerName, location } = req.body;

//     const newTrainingEvent = new TrainingEvent({
//       title,
//       domain,
//       date,
//       duration,
//       trainerName,
//       location
//     });

//     console.log("newTrainingEvent::::",newTrainingEvent)
//     const savedTrainingEvent = await newTrainingEvent.save();
//     console.log("savedTrainingEvent::::",savedTrainingEvent)


//     console.log("User Registered Successfully");
//     res.status(200).json({savedTrainingEvent: savedTrainingEvent});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.post('/createevent', async (req, res) => {
  try {
    const { title, domain, date, duration, trainerName, location, desc } = req.body;
    console.log("req", req.body);

    const newTrainingEvent = new TrainingEvent({
      title,
      domain,
      date,
      duration,
      trainerName,
      location,
      desc
    });

    const savedTrainingEvent = await newTrainingEvent.save();

    if (savedTrainingEvent) {
      console.log("Training Event Created Successfully");
      res.status(200).json({ savedTrainingEvent });
    } else {
      res.status(400).json({ message: 'Event creation failed' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: errors });
    }
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

app.post('/editevent/:eventId', async (req, res) => {
  const { eventId } = req.params;
  console.log("eventid", eventId)
  try {
    const {
      title,
      domain,
      date,
      duration,
      trainerName,
      location,
      desc
    } = req.body;

    // Check if the event exists
    const existingEvent = await TrainingEvent.findById(eventId);
    // if (!existingEvent) {
    //   return res.status(404).json({ message: 'Event not found' });
    // }

    // Update the event with the new data
    existingEvent.title = title;
    existingEvent.domain = domain;
    existingEvent.date = date;
    existingEvent.duration = duration;
    existingEvent.trainerName = trainerName;
    existingEvent.location = location;
    existingEvent.desc = desc;

    console.log("Event to edit found");

    // Save the updated event in the database
    const event = await existingEvent.save();
    return res.status(200).json(event);
    console.log("after update");
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/deleteevent', async (req, res) => {
  try {
    const {title} = req.body;
 
    // Check if the certification exists
    const existingevent = await TrainingEvent.findOne({ title });
    if (!existingevent) {
      return res.status(404).json({ message: 'Event not found' });
    }
 
    // Save the updated certification in the database
    await TrainingEvent.deleteOne({ title });
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/fetch-event/:eventId", async (req, res) => {
  const { eventId } = req.params;
 
  try {
    const response = await TrainingEvent.findById(eventId);
 
    if (!response) {
      return res.status(404).send({ error: "Event not found" });
    }
 
    res.send(response);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
