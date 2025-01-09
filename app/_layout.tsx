import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
