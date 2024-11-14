const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Models
const facultySchema = new mongoose.Schema({
  name: String,
  designation: String,
  branch: String
});

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  branch: String
});

const Faculty = mongoose.model('Faculty', facultySchema);
const Student = mongoose.model('Student', studentSchema);

// Routes for Faculty
app.get('/api/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/faculty', async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routes for Students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Bulk Upload Routes
app.post('/api/bulk-upload/faculty', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileRows = [];
    csv.parseFile(req.file.path)
      .on('data', (data) => {
        fileRows.push({
          name: data[0],
          designation: data[1],
          branch: data[2]
        });
      })
      .on('end', async () => {
        fileRows.shift(); // Remove header row
        try {
          await Faculty.insertMany(fileRows);
          fs.unlinkSync(req.file.path); // Delete file after processing
          res.json({ message: 'Bulk upload successful' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/bulk-upload/students', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileRows = [];
    csv.parseFile(req.file.path)
      .on('data', (data) => {
        fileRows.push({
          name: data[0],
          rollNumber: data[1],
          branch: data[2]
        });
      })
      .on('end', async () => {
        fileRows.shift(); // Remove header row
        try {
          await Student.insertMany(fileRows);
          fs.unlinkSync(req.file.path); // Delete file after processing
          res.json({ message: 'Bulk upload successful' });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});