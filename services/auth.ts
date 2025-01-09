import { LogtoClient, UserInfoResponse } from '@logto/rn';
import { logtoConfig } from '../config/logto';
import * as WebBrowser from 'expo-web-browser';

let logtoClient: LogtoClient | null = null;

export const getLogtoClient = () => {
  if (!logtoClient) {
    logtoClient = new LogtoClient(logtoConfig);
  }
  return logtoClient;
};

export const AuthService = {
  signIn: async () => {
    const client = getLogtoClient();
    try {
      // Close any existing web browser sessions
      await WebBrowser.warmUpAsync();
      await client.signIn('io.logto://callback');
    } finally {
      await WebBrowser.coolDownAsync();
    }
  },

  signOut: async () => {
    const client = getLogtoClient();
    try {
      await WebBrowser.warmUpAsync();
      await client.signOut();
    } finally {
      await WebBrowser.coolDownAsync();
    }
  },

  getUser: async (): Promise<UserInfoResponse | null> => {
    const client = getLogtoClient();
    try {
      const isAuth = await client.isAuthenticated();
      if (!isAuth) return null;
      return await client.fetchUserInfo();
    } catch {
      return null;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    const client = getLogtoClient();
    try {
      return await client.isAuthenticated();
    } catch {
      return false;
    }
  }
}; 