const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const areaRoutes = require('./routes/areaRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(
  'mongodb+srv://user:user123@cluster0.lp9en.mongodb.net/dtds?retryWrites=true&w=majority',
  () => {
    console.log('connected');
    app.listen(3001, () => {
      console.log('server runs perfectly');
    });
  }
);

// area
app.use(areaRoutes);

// employee
app.use(employeeRoutes);

// people
app.use(peopleRoutes);
