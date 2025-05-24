import { useState, useEffect } from 'react';
import { createCourse, fetchCourseById, updateCourse } from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const InstructorCourseForm = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCourseById(id)
        .then(res => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setContent(res.data.content);
        })
        .catch(() => setError('Failed to load course data'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (id) {
        await updateCourse(id, { title, description, content });
      } else {
        await createCourse({ title, description, content });
      }
      navigate('/instructor/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Course' : 'Add New Course'}</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title</label>
        <input
          type="text" required
          className="w-full p-2 border mb-4"
          value={title} onChange={e => setTitle(e.target.value)}
        />
        <label className="block mb-2">Description</label>
        <textarea
          required
          className="w-full p-2 border mb-4"
          value={description} onChange={e => setDescription(e.target.value)}
        />
        <label className="block mb-2">Content</label>
        <textarea
          className="w-full p-2 border mb-4"
          value={content} onChange={e => setContent(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default InstructorCourseForm;
