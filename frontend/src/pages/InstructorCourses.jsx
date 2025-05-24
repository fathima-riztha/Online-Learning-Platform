import { useEffect, useState } from 'react';
import { fetchInstructorCourses, deleteCourse } from '../api/api';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUsers } from 'react-icons/fa';

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    fetchInstructorCourses()
      .then(res => setCourses(res.data))
      .catch(console.error);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await deleteCourse(id);
      loadCourses();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete course');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      <Link
        to="/instructor/courses/new"
        className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add New Course
      </Link>

      {courses.length === 0 ? (
        <p>You have not created any courses yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-300">Course Title</th>
              <th className="text-center px-4 py-3 border-b border-gray-300" style={{ width: '150px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b border-gray-300">
                  <Link to={`/courses/${course._id}`} className="text-blue-600 underline">
                    {course.title}
                  </Link>
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-center">
                  <div className="flex justify-center space-x-4">
                    <Link
                      to={`/instructor/courses/edit/${course._id}`}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash size={20} />
                    </button>
                    <Link
                      to={`/instructor/courses/${course._id}/enrolled`}
                      className="text-green-600 hover:text-green-800"
                      title="View Enrolled Students"
                    >
                      <FaUsers size={20} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InstructorCourses;
