import React from 'react';
import {  Link, useLocation } from 'react-router-dom';
// import { auth } from '../lib/auth';
import { BookOpen } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  // const navigate = useNavigate();
  const location = useLocation();

  // const handleLogout = async () => {
  //   await auth.signOut();
  //   setIsAuthenticated(false);
  //   navigate('/');
  // };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold">SkillHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/tutorials"
                className={`px-3 py-2 rounded-md ${
                  isActive('/tutorials') ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                } transition-colors`}
              >
                Tutorials
              </Link>
              <Link
                to="/assignments"
                className={`px-3 py-2 rounded-md ${
                  isActive('/assignments') ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                } transition-colors`}
              >
                Assignments
              </Link>
              <Link
                to="/tasks"
                className={`px-3 py-2 rounded-md ${
                  isActive('/tasks') ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                } transition-colors`}
              >
                Tasks
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md ${
                  isActive('/about') ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                } transition-colors`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-md ${
                  isActive('/contact') ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                } transition-colors`}
              >
                Contact
              </Link>
            </div>
          </div>
          
          {/* <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;