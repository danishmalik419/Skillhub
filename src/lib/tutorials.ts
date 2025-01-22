interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
}

const TUTORIALS_KEY = 'skillhub_tutorials';

// Initialize with some default tutorials
const defaultTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Learn React Basics',
    description: 'An introduction to React and its basic concepts.',
    category: 'React',
    videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0', // Corrected YouTube link
  },
  {
    id: '2',
    title: 'JavaScript for Beginners',
    description: 'Learn the fundamentals of JavaScript programming.',
    category: 'JavaScript',
    videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk', // Corrected YouTube link
  },
  {
    id: '3',
    title: 'CSS Flexbox Tutorial',
    description: 'Learn how to create flexible layouts using Flexbox.',
    category: 'CSS',
    videoUrl: 'https://www.youtube.com/embed/fYq5PXgSsbE',
  },
  {
    id: '4',
    title: 'Introduction to Node.js',
    description: 'Learn how to work with Node.js and its ecosystem.',
    category: 'Node.js',
    videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4',
  },
  {
    id: '5',
    title: 'Mastering Git and GitHub',
    description: 'Learn how to use Git for version control and collaborate using GitHub.',
    category: 'Git',
    videoUrl: 'https://www.youtube.com/embed/0fKg7e37bQE',
  }
];

export const tutorialService = {
  getTutorials: () => {
    const stored = localStorage.getItem(TUTORIALS_KEY);
    return stored ? JSON.parse(stored) : defaultTutorials;
  },

  addTutorial: (tutorial: Omit<Tutorial, 'id'>) => {
    const tutorials = tutorialService.getTutorials();
    const newTutorial = {
      ...tutorial,
      id: crypto.randomUUID()
    };
    tutorials.push(newTutorial);
    localStorage.setItem(TUTORIALS_KEY, JSON.stringify(tutorials));
    return newTutorial;
  }
};