const express = require('express');
const router = express.Router();
const { createStudent, getStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

router.post('/faculty', facultyController.createFaculty);
router.get('/faculty', facultyController.getFaculty);
router.put('/faculty/:id', facultyController.updateFaculty);
router.delete('/faculty/:id', facultyController.deleteFaculty);

module.exports = router;
