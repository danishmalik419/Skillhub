import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { tutorialService } from '../lib/tutorials';

const Tutorials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tutorials, setTutorials] = useState<any[]>([]);

  useEffect(() => {
    setTutorials(tutorialService.getTutorials());
  }, []);

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Tutorials</h1>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map(tutorial => (
          <div
            key={tutorial.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={tutorial.videoUrl}
                className="w-full h-48 rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
            <p className="text-gray-600 mb-4">{tutorial.description}</p>
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {tutorial.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;