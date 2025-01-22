interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  session: any | null;
}

const AUTH_KEY = 'skillhub_auth';

export const auth = {
  getSession: async () => {
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? { data: { session: JSON.parse(stored) } } : { data: { session: null } };
  },

  signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
    // In a real app, validate against a backend
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find((u: User) => u.email === email);
    
    if (!user || password !== 'password') { // Simple password check
      return { error: { message: 'Invalid login credentials' } };
    }

    const session = { user };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { error: null };
  },

  signUp: async ({ email, password }: { email: string; password: string }) => {
    // In a real app, validate and store in backend
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (storedUsers.some((u: User) => u.email === email)) {
      return { error: { message: 'User already exists' } };
    }

    const newUser = { id: crypto.randomUUID(), email };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    return { error: null };
  },

  signOut: async () => {
    localStorage.removeItem(AUTH_KEY);
    return { error: null };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const handler = () => {
      const session = localStorage.getItem(AUTH_KEY);
      callback('SIGNED_IN', session ? JSON.parse(session) : null);
    };

    window.addEventListener('storage', handler);
    return {
      subscription: {
        unsubscribe: () => window.removeEventListener('storage', handler)
      }
    };
  }
};