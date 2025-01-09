import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const { signIn, signOut, user, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      await signIn();
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Sign in error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      setError('Sign out failed. Please try again.');
      console.error('Sign out error:', err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffd33d" />
        <Text style={styles.hint}>Checking authentication status...</Text>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.userText}>
            {user.name || user.username || 'User'}
          </Text>
          {user.email && (
            <Text style={styles.emailText}>{user.email}</Text>
          )}
        </View>
        
        <View style={styles.buttonGroup}>
          <Pressable
            style={styles.button}
            onPress={() => router.push('/')}
          >
            <Text style={styles.buttonText}>Go to Posts</Text>
          </Pressable>
          
          <Pressable
            style={[styles.button, styles.signOutButton]}
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Pressable
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#25292e" />
        ) : (
          <Text style={styles.buttonText}>Sign In with Logto</Text>
        )}
      </Pressable>
      <Text style={styles.hint}>
        {isLoading ? 'Authenticating...' : 'Not signed in. Tap to sign in.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: '#2f3542',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  userText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: '#ccc',
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    backgroundColor: '#ffd33d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff4757',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#25292e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4757',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
  },
  hint: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
}); 