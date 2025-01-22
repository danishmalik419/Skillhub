import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { tutorialService } from '../lib/tutorials';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTutorial, setSelectedTutorial] = useState<any | null>(null);
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

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Available Tutorials</h2>
          {filteredTutorials.map(tutorial => (
            <div
              key={tutorial.id}
              onClick={() => setSelectedTutorial(tutorial)}
              className="p-4 border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
            >
              <h3 className="text-lg font-semibold">{tutorial.title}</h3>
              <p className="text-gray-600">{tutorial.description}</p>
              <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {tutorial.category}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          {selectedTutorial ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">{selectedTutorial.title}</h2>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={selectedTutorial.videoUrl}
                  className="w-full h-[400px] rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-600">{selectedTutorial.description}</p>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>Select a tutorial to start learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;