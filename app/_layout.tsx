import { Stack } from 'expo-router';
import { LogtoProvider } from '@logto/rn';
import { AuthProvider } from '../contexts/auth';
import { logtoConfig } from '../config/logto';
import { LoadingScreen } from '../components/LoadingScreen';
import { useAuth } from '../contexts/auth';

function RootLayoutNav() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerTintColor: '#fff',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="(auth)/login" 
        options={{ 
          title: 'Sign In',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Posts',
        }} 
      />
      <Stack.Screen 
        name="posts/[id]" 
        options={{
          title: 'Edit Post',
        }}
      />
      <Stack.Screen 
        name="posts/new" 
        options={{
          title: 'Create Post',
        }}
      />
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <LogtoProvider config={logtoConfig}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </LogtoProvider>
  );
}
