import { useEffect, useState } from 'react';
import { fetchEnrolledStudents } from '../api/api';
import { useParams } from 'react-router-dom';

const InstructorEnrolledStudents = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchEnrolledStudents(courseId)
      .then(res => setStudents(res.data))
      .catch(console.error);
  }, [courseId]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Students Enrolled</h1>
      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.student._id}>
                <td className="border border-gray-300 p-2">{s.student.name}</td>
                <td className="border border-gray-300 p-2">{s.student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InstructorEnrolledStudents;
