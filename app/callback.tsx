import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/auth';
import { LoadingScreen } from '../components/LoadingScreen';

export default function CallbackPage() {
  const { signIn } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await signIn();
        router.replace('/');
      } catch (error) {
        console.error('Callback error:', error);
        router.replace('/login');
      }
    };

    handleCallback();
  }, []);

  return <LoadingScreen message="Completing sign in..." />;
} 