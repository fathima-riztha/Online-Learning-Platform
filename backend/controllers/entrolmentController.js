const Enrollment = require('../models/Entrolment');
const Course = require('../models/Course');

exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if already enrolled
    const existing = await Enrollment.findOne({
      course: courseId,
      student: req.user.userId
    });
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      course: courseId,
      student: req.user.userId
    });

    await enrollment.save();
    res.status(201).json({ message: 'Enrollment successful' });
  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed' });
  }
};

exports.getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.userId })
      .populate('course');
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled courses' });
  }
};

exports.getCourseEnrollments = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const enrollments = await Enrollment.find({ course: courseId })
      .populate('student', 'name email');

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching enrolled students' });
  }
};
