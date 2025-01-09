import { LogtoClient, UserInfoResponse } from '@logto/rn';
import { logtoConfig } from '../config/logto';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

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
    if (Platform.OS === 'web') {
      await client.signIn(logtoConfig.redirectUri);
    } else {
      try {
        await WebBrowser.warmUpAsync();
        await client.signIn(logtoConfig.redirectUri);
      } finally {
        await WebBrowser.coolDownAsync();
      }
    }
  },

  signOut: async () => {
    const client = getLogtoClient();
    if (Platform.OS === 'web') {
      await client.signOut(window.location.origin);
    } else {
      try {
        await WebBrowser.warmUpAsync();
        await client.signOut();
      } finally {
        await WebBrowser.coolDownAsync();
      }
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