import { useEffect, useState, useContext } from 'react';
import { fetchCourseById } from '../api/api';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCourseById(id).then(res => setCourse(res.data)).catch(console.error);
  }, [id]);


  if (!course) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-4">{course.description}</p>
      <p className="mt-2 text-sm text-gray-600">Instructor: {course.instructor.name}</p>
      <div className="mt-4">
        <h2 className="font-semibold">Content:</h2>
        <p>{course.content || 'No content provided.'}</p>
      </div>

      {user && user.role === 'student' && (
        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enroll in this Course
        </button>
      )}

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default CourseDetails;
