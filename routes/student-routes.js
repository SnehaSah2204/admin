const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent
      } = require('../controllers/studentController');

const router = express.Router();
router.post('/user', addStudent);
router.get('/users', getAllStudents);
router.get('/user/:id', getStudent);
router.put('/user/:id', updateStudent);
router.delete('/user/:id',deleteStudent);

module.exports = {
    routes: router
}