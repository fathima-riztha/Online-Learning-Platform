import { useEffect, useState } from 'react';
import { fetchMyEnrollments } from '../api/api';
import { Link } from 'react-router-dom';

const statusColors = {
  active: 'text-green-600',
  completed: 'text-blue-600',
  dropped: 'text-red-600',
};

const StudentEnrolled = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchMyEnrollments()
      .then(res => setEnrollments(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">My Enrolled Courses</h1>
      {enrollments.length === 0 ? (
        <p>You are not enrolled in any courses yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-300">Course Title</th>
              <th className="text-left px-4 py-3 border-b border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(({ course, status }) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b border-gray-300">
                  <Link to={`/courses/${course._id}`} className="text-blue-600 underline">
                    {course.title}
                  </Link>
                </td>
                <td className={`px-4 py-3 border-b border-gray-300 font-semibold ${statusColors[status] || 'text-gray-600'}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentEnrolled;


