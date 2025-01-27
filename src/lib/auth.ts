interface User {
  id: string;
  email: string;
  hashedPassword: string; // Store hashed passwords
}

interface AuthState {
  user: User | null;
  session: any | null;
}

const AUTH_KEY = 'skillhub_auth';
const USERS_KEY = 'users'; // Key to store all users

export const auth = {
  // Get the current session
  getSession: async () => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? { data: { session: JSON.parse(stored) } } : { data: { session: null } };
  },

  // Sign in with email and password
  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    // Find the user by email
    const user = storedUsers.find((u: User) => u.email === email);
    if (!user) {
      return { error: { message: 'Invalid login credentials' } };
    }

    // Verify the password (hash simulation for simplicity)
    if (user.hashedPassword !== btoa(password)) {
      return { error: { message: 'Invalid login credentials' } };
    }

    // Create a session for the user
    const session = { user };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { error: null };
  },

  // Sign up a new user
  signUp: async ({ email, password }: { email: string; password: string }) => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    // Check if the email is already registered
    if (storedUsers.some((u: User) => u.email === email)) {
      return { error: { message: 'User already exists' } };
    }

    // Create a new user and hash the password
    const newUser: User = { id: crypto.randomUUID(), email, hashedPassword: btoa(password) };
    storedUsers.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(storedUsers));
    return { error: null };
  },

  // Sign out the current user
  signOut: async () => {
    localStorage.removeItem(AUTH_KEY);
    return { error: null };
  },

  // Handle auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const handler = () => {
      const session = localStorage.getItem(AUTH_KEY);
      callback('SIGNED_IN', session ? JSON.parse(session) : null);
    };

    window.addEventListener('storage', handler);
    return {
      subscription: {
        unsubscribe: () => window.removeEventListener('storage', handler),
      },
    };
  },
};
      