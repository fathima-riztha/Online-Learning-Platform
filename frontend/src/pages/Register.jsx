import { useState, useContext } from 'react';
import { registerUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser({ name, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Name</label>
        <input
          type="text" required
          className="w-full p-2 border mb-4"
          value={name} onChange={e => setName(e.target.value)}
        />
        <label className="block mb-2">Email</label>
        <input
          type="email" required
          className="w-full p-2 border mb-4"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <label className="block mb-2">Password</label>
        <input
          type="password" required
          className="w-full p-2 border mb-4"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <label className="block mb-2">Role</label>
        <select
          className="w-full p-2 border mb-4"
          value={role} onChange={e => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
