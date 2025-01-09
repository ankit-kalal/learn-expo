import { LogtoConfig } from '@logto/rn';
import { Platform } from 'react-native';
import { storageAdapter } from '../utils/storage-adapter';

const getRedirectUri = () => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return window.location.origin + '/callback';
  }
  return 'io.logto://callback';
};

export const logtoConfig: LogtoConfig = {
  endpoint: 'https://mgdwia.logto.app/',
  appId: '8sr3y8o0ex1ddbn5tfikf',
  scopes: ['email', 'profile', 'openid'],
  resources: [],
  storage: storageAdapter,
  usingPersistStorage: true,
  redirectUri: getRedirectUri(),
}; 