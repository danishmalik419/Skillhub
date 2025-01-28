import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // By default, show login button
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    setShowLogin(false); // Hide login button, show signup
    navigate('/login'); // Navigate to login page
  };

  const handleSignUpClick = () => {
    setShowLogin(true); // Hide signup button, show login
    navigate('/signup'); // Navigate to signup page
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <span className="text-2xl font-bold text-blue-600">SkillHub</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <a href="/" className="text-gray-700 hover:text-blue-600">Home</a> */}
            <a href="/tutorials" className="text-gray-700 hover:text-blue-600">Tutorials</a>
            <a href="/assignments" className="text-gray-700 hover:text-blue-600">Assignments</a>
            <a href="/tasks" className="text-gray-700 hover:text-blue-600">Tasks</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>

          {/* Auth Button - Only shows one button at a time */}
          <div className="hidden md:flex items-center">
            {showLogin ? (
              <button
                onClick={handleLoginClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleSignUpClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</a>
            <a href="/tutorials" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Tutorials</a>
            <a href="/assignments" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Assignments</a>
            <a href="/tasks" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Tasks</a>
            <a href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About</a>
            <a href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</a>
          </div>
          <div className="px-4 py-3">
            {showLogin ? (
              <button
                onClick={handleLoginClick}
                className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleSignUpClick}
                className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
