import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Complete JavaScript Basics',
    description: 'Review fundamental JavaScript concepts and complete exercises',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Build Portfolio Project',
    description: 'Create a personal portfolio website using React',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Study CSS Flexbox',
    description: 'Learn and practice CSS Flexbox layouts',
    status: 'completed',
    priority: 'low',
  },
];

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setCurrentTask(null); // Clear form for new task
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task); // Populate form with current task
    setShowForm(true);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStartTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: 'in-progress' } : task));
  };

  const handleFormSubmit = (task: Task) => {
    if (task.id) {
      // Update existing task
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      // Add new task at the top
      setTasks([{ ...task, id: tasks.length + 1 }, ...tasks]);
    }
    setShowForm(false);
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add New Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={currentTask}
          onCancel={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <div className="grid gap-6">
        {tasks.map(task => (
          <div
            key={task.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="space-x-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditTask(task)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                {task.status !== 'completed' && (
                  <button
                    onClick={() => handleStartTask(task.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Task
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TaskFormProps {
  task: Task | null;
  onCancel: () => void;
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<Task>(
    task || {
      id: 0,
      title: '',
      description: '',
      status: 'todo',
      priority: 'low',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">{task ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tasks;
