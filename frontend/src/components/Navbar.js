import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
          onClick={() => setOpen(false)}
        >
          Eventify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/events" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link
                to="/my-events"
                className="text-gray-600 hover:text-blue-600"
              >
                My Events
              </Link>
              <Link
                to="/events/new"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                + Create Event
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white border-t">
          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block bg-blue-600 text-white px-4 py-2 rounded text-center"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/events"
                onClick={() => setOpen(false)}
                className="block text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                to="/my-events"
                onClick={() => setOpen(false)}
                className="block text-gray-600 hover:text-blue-600"
              >
                My Events
              </Link>
              <Link
                to="/events/new"
                onClick={() => setOpen(false)}
                className="block bg-green-600 text-white px-4 py-2 rounded text-center"
              >
                + Create Event
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
