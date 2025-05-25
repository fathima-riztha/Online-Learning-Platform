import  { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-xl font-bold">Edvik Online Academy</Link>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && user.role === 'student' && (
          <>
            <Link to="/courses">Courses</Link>
            <Link to="/my-courses">My Courses</Link>
            <Link to="/gpt-recommendations">ChatGPT</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {user && user.role === 'instructor' && (
          <>
            <Link to="/instructor/courses">My Courses</Link>
            <Link to="/instructor/courses/new">Add Course</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
