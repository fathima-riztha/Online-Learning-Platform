const express = require('express');

const {enrollInCourse, 
       getStudentEnrollments, 
       getCourseEnrollments} = require('../controllers/entrolmentController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// Students enroll in a course
router.post('/:courseId', authMiddleware, roleMiddleware('student'), enrollInCourse);

// Students view their enrolled courses
router.get('/my-courses', authMiddleware, roleMiddleware('student'), getStudentEnrollments);

// Instructors view students enrolled in a course
router.get('/course/:courseId', authMiddleware, roleMiddleware('instructor'), getCourseEnrollments);

module.exports = router;

