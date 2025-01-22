import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold">SkillHub</span>
            </Link>
          </div>

          {/* Desktop Links */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-3 py-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-start space-y-2 mt-2">
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
