import { LogtoConfig } from '@logto/rn';
import { Platform } from 'react-native';
import { storageAdapter } from '../utils/storage-adapter';

// Helper function to safely get window origin
const getWindowOrigin = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

// Create base config without web-specific options
const baseConfig: LogtoConfig = {
  endpoint: 'https://mgdwia.logto.app/',
  appId: '8sr3y8o0ex1ddbn5tfikf',
  scopes: ['email', 'profile', 'openid'],
  resources: [],
  storage: storageAdapter,
  usingPersistStorage: true,
  redirectUri: Platform.OS === 'web' ? getWindowOrigin() + '/callback' : 'io.logto://callback',
};

// Add web-specific config only on client side
export const getLogtoConfig = (): LogtoConfig => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return {
      ...baseConfig,
      prompt: 'consent',
      resource: window.location.origin,
    };
  }
  return baseConfig;
};

export const logtoConfig = getLogtoConfig(); 