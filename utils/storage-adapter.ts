import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const getLocalStorage = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

export const storageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const localStorage = getLocalStorage();
      if (localStorage) {
        return localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      const localStorage = getLocalStorage();
      if (localStorage) {
        localStorage.setItem(key, value);
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch {
      // Handle error silently
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      const localStorage = getLocalStorage();
      if (localStorage) {
        localStorage.removeItem(key);
        return;
      }
      await AsyncStorage.removeItem(key);
    } catch {
      // Handle error silently
    }
  },
}; 