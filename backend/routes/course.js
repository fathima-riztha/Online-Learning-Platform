const express = require('express');
const router = express.Router();

const {
  createCourse,
  getInstructorCourses,
  getCourseById,
  getAllCourses,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Instructor-only: Create a new course
router.post('/', authMiddleware, roleMiddleware('instructor'), createCourse);

// Instructor-only: Get all courses by logged-in instructor
router.get('/instructor', authMiddleware, roleMiddleware('instructor'), getInstructorCourses);

// Public or authenticated users (students): Get all courses (for enrollment)
router.get('/', authMiddleware, roleMiddleware('student'), getAllCourses);

// Get course details by ID (accessible to both roles)
router.get('/:id', authMiddleware, getCourseById);

// Instructor-only: Update a course (only own courses)
router.put('/:id', authMiddleware, roleMiddleware('instructor'), updateCourse);

// Instructor-only: Delete a course (only own courses)
router.delete('/:id', authMiddleware, roleMiddleware('instructor'), deleteCourse);

module.exports = router;
