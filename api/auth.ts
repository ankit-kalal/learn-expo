interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

export const AuthApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy validation
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
    }
    throw new Error('Invalid credentials');
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  },
}; 