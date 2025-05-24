import { useState, useContext } from 'react';
import { loginUser } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser({ email, password });
      setUser({ ...data.user, token: data.token });
      if (data.user.role === 'student') navigate('/courses');
      else navigate('/instructor/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

