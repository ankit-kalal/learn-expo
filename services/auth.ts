import { LogtoClient, UserInfoResponse } from '@logto/rn';
import { getLogtoConfig } from '../config/logto';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

let logtoClient: LogtoClient | null = null;

export const getLogtoClient = () => {
  if (!logtoClient) {
    logtoClient = new LogtoClient(getLogtoConfig());
  }
  return logtoClient;
};

export const AuthService = {
  signIn: async () => {
    const client = getLogtoClient();
    const config = getLogtoConfig();
    
    if (Platform.OS === 'web') {
      window.location.href = await client.signIn(config.redirectUri, {
        redirectUri: config.redirectUri,
        prompt: 'consent',
      });
    } else {
      try {
        await WebBrowser.warmUpAsync();
        await client.signIn(config.redirectUri);
      } finally {
        await WebBrowser.coolDownAsync();
      }
    }
  },

  handleSignInCallback: async (callbackUrl: string) => {
    const client = getLogtoClient();
    try {
      await client.handleSignInCallback(callbackUrl);
      return true;
    } catch (error) {
      console.error('Handle sign-in callback error:', error);
      return false;
    }
  },

  signOut: async () => {
    const client = getLogtoClient();
    const config = getLogtoConfig();
    
    if (Platform.OS === 'web') {
      window.location.href = await client.signOut(config.redirectUri);
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