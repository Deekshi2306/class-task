const Faculty = require('../models/Faculty');

// Create a faculty member
exports.createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all faculty members
exports.getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a faculty member
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a faculty member
exports.deleteFaculty = async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
