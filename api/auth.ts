import { LogtoClient } from '@logto/rn';

export const logtoConfig = {
  endpoint: 'https://mgdwia.logto.app/',  // Your Logto endpoint
  appId: '8sr3y8o0ex1ddbn5tfikf',        // Your Logto app ID
  resources: [],
  scopes: ['email', 'profile', 'openid'],
};

let logtoClient: LogtoClient | null = null;

export const AuthApi = {
  getClient: () => {
    if (!logtoClient) {
      logtoClient = new LogtoClient(logtoConfig);
    }
    return logtoClient;
  },

  isAuthenticated: async (): Promise<boolean> => {
    const client = AuthApi.getClient();
    return client.isAuthenticated();
  },

  login: async (): Promise<void> => {
    const client = AuthApi.getClient();
    await client.signIn('io.logto://callback');
  },

  logout: async (): Promise<void> => {
    const client = AuthApi.getClient();
    await client.signOut();
  },

  getUser: async () => {
    const client = AuthApi.getClient();
    const userInfo = await client.fetchUserInfo();
    return {
      id: userInfo.sub,
      email: userInfo.email,
      name: userInfo.name || userInfo.username || 'User',
    };
  },
}; 