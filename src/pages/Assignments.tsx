import React, { useState } from 'react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  deadline: string;
  difficulty: string;
  status: 'to do' | 'in progress' | 'completed';
  code: string; // To store user-written code
}

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Build a React Todo App',
    description: 'Create a fully functional todo application using React and state management',
    deadline: '2024-03-25',
    difficulty: 'Intermediate',
    status: 'to do',
    code: '',
  },
  {
    id: 2,
    title: 'JavaScript Array Methods',
    description: 'Complete exercises focusing on map, filter, reduce, and other array methods',
    deadline: '2024-03-20',
    difficulty: 'Beginner',
    status: 'to do',
    code: '',
  },
  {
    id: 3,
    title: 'CSS Grid Layout',
    description: 'Build a responsive grid layout using CSS Grid',
    deadline: '2024-03-22',
    difficulty: 'Beginner',
    status: 'to do',
    code: '',
  },
];

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [newAssignment, setNewAssignment] = useState<Assignment>({
    id: 0,
    title: '',
    description: '',
    deadline: '',
    difficulty: 'Beginner',
    status: 'to do',
    code: '',
  });
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);

  const handleStartAssignment = (assignment: Assignment) => {
    setActiveAssignment(assignment);
    // Redirect to the Programiz online compiler
    window.location.href = "https://www.programiz.com/javascript/online-compiler/";
  };

  const handleSaveCode = (updatedCode: string) => {
    if (activeAssignment) {
      setAssignments(prevAssignments =>
        prevAssignments.map(a =>
          a.id === activeAssignment.id ? { ...a, code: updatedCode } : a
        )
      );
    }
  };

  const handleStatusChange = (status: 'to do' | 'in progress' | 'completed') => {
    if (activeAssignment) {
      setAssignments(prevAssignments =>
        prevAssignments.map(a =>
          a.id === activeAssignment.id ? { ...a, status } : a
        )
      );
      setActiveAssignment(null); // Close the editor after status update
    }
  };

  const handleAddAssignment = () => {
    const newAssignmentWithId = {
      ...newAssignment,
      id: assignments.length + 1, // Generate a new ID based on the current list length
    };
    setAssignments(prevAssignments => [...prevAssignments, newAssignmentWithId]);
    setNewAssignment({ id: 0, title: '', description: '', deadline: '', difficulty: 'Beginner', status: 'to do', code: '' });
    setIsAddingAssignment(false);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setNewAssignment(assignment);
    setIsAddingAssignment(true);
  };

  const handleDeleteAssignment = (assignmentId: number) => {
    setAssignments(prevAssignments => prevAssignments.filter(a => a.id !== assignmentId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>

      {/* Add New Assignment Button */}
      {!isAddingAssignment && (
        <button
          onClick={() => setIsAddingAssignment(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-8 transition-colors"
        >
          Add New Assignment
        </button>
      )}

      {/* Add New Assignment Form */}
      {isAddingAssignment && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add / Edit Assignment</h2>
          <input
            type="text"
            placeholder="Title"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            className="mb-2 p-2 w-full border rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            className="mb-2 p-2 w-full border rounded-md"
          />
          <input
            type="date"
            value={newAssignment.deadline}
            onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            className="mb-2 p-2 w-full border rounded-md"
          />
          <select
            value={newAssignment.difficulty}
            onChange={(e) => setNewAssignment({ ...newAssignment, difficulty: e.target.value })}
            className="mb-2 p-2 w-full border rounded-md"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <div className="flex space-x-4">
            <button
              onClick={handleAddAssignment}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {newAssignment.id ? 'Update Assignment' : 'Add Assignment'}
            </button>
            <button
              onClick={() => {
                setIsAddingAssignment(false); // Hide the form
                setNewAssignment({ id: 0, title: '', description: '', deadline: '', difficulty: 'Beginner', status: 'to do', code: '' }); // Reset the form
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Active Assignment Editor */}
      {activeAssignment ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{activeAssignment.title}</h2>
          <textarea
            value={activeAssignment.code}
            onChange={(e) => handleSaveCode(e.target.value)}
            className="w-full h-64 p-4 border rounded-md mb-4"
            placeholder="Write your code here..."
          />
          <div className="flex space-x-4">
            <button
              onClick={() => handleStatusChange('completed')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => handleStatusChange('in progress')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Mark as In Progress
            </button>
            <button
              onClick={() => handleStatusChange('to do')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Mark as To Do
            </button>
            <button
              onClick={() => setActiveAssignment(null)}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Close Editor
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {assignments.map(assignment => (
            <div
              key={assignment.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{assignment.title}</h3>
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm mr-2 ${
                      assignment.difficulty === 'Beginner'
                        ? 'bg-green-100 text-green-800'
                        : assignment.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {assignment.difficulty}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      assignment.status === 'to do'
                        ? 'bg-red-100 text-red-800'
                        : assignment.status === 'in progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Deadline</p>
                  <p className="font-medium">{assignment.deadline}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleStartAssignment(assignment)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Start Assignment
                </button>
                <button
                  onClick={() => handleEditAssignment(assignment)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAssignment(assignment.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
