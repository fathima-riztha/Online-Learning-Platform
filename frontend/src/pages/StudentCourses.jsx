import { useEffect, useState } from 'react';
import { fetchCourses } from '../api/api';
import { enrollInCourse } from '../api/api';
import { Link } from 'react-router-dom';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses().then(res => setCourses(res.data)).catch(console.error);
  }, []);

  const handleEnroll = async (courseId) => {
    setMessage('');
    try {
      await enrollInCourse(courseId);
      setMessage('Enrollment successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course._id} className="border rounded p-4 shadow">
            <Link to={`/courses/${course._id}`}>
              <h2 className="text-xl font-semibold">{course.title}</h2>
            </Link>
            <p className="mt-2">{course.description}</p>
            <p className="mt-1 text-sm text-gray-600">Instructor: {course.instructor.name}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleEnroll(course._id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
