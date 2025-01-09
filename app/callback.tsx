import { useEffect } from 'react';
import { router } from 'expo-router';
import { AuthService } from '../services/auth';
import { LoadingScreen } from '../components/LoadingScreen';
import { Platform } from 'react-native';

export default function CallbackPage() {
  useEffect(() => {
    let isMounted = true;

    const handleCallback = async () => {
      try {
        if (Platform.OS === 'web') {
          const success = await AuthService.handleSignInCallback(window.location.href);
          if (success && isMounted) {
            // Redirect back to the main page
            window.location.href = window.location.origin;
            return;
          }
        }
        
        if (isMounted) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Callback error:', error);
        if (isMounted) {
          router.replace('/login');
        }
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, []);

  return <LoadingScreen message="Completing sign in..." />;
} 