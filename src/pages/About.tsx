import React from 'react';
import { BookOpen, Users, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const About: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/Tutorials'); // Redirect to the tutorial page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About SkillHub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          SkillHub is your one-stop platform for learning and improving your programming skills.
          We provide high-quality tutorials, practical assignments, and structured learning paths.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="text-center p-6">
          <BookOpen className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
          <p className="text-gray-600">Carefully curated tutorials and resources for effective learning</p>
        </div>
        <div className="text-center p-6">
          <Users className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
          <p className="text-gray-600">Learn and grow with a supportive community of developers</p>
        </div>
        <div className="text-center p-6">
          <Award className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Skill Recognition</h3>
          <p className="text-gray-600">Earn certificates and badges as you complete courses</p>
        </div>
        <div className="text-center p-6">
          <Clock className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
          <p className="text-gray-600">Flexible learning schedule that fits your lifestyle</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600 mb-4">
          At SkillHub, we believe that everyone should have access to quality programming education.
          Our mission is to provide a comprehensive learning platform that helps aspiring developers
          master the skills they need to succeed in their careers.
        </p>
        <p className="text-lg text-gray-600">
          We focus on practical, hands-on learning with real-world projects and assignments
          that help you build a strong portfolio while learning.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Start Your Learning Journey</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of learners who have already started their journey with SkillHub.
        </p>
        <button
          onClick={handleGetStarted} // Attach click handler
          className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
