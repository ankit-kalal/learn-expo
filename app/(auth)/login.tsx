import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { AuthService } from '../../services/auth';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function LoginScreen() {
  const { signIn, signOut, user, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message); // Terminal log
    setLogs(prev => [`${new Date().toISOString()}: ${message}`, ...prev]);
  };

  useEffect(() => {
    addLog(`Initial auth state - User: ${user ? 'Logged in' : 'Not logged in'}`);
  }, []);

  const handleSignIn = async () => {
    try {
      setError(null);
      addLog('Starting sign in process...');
      await signIn();
      addLog('Sign in completed successfully');
      
      // Check authentication status after sign in
      const authState = await AuthService.isAuthenticated();
      addLog(`Authentication status after sign in: ${authState ? 'Authenticated' : 'Not authenticated'}`);
      
      if (authState) {
        const userData = await AuthService.getUser();
        addLog(`User data received: ${JSON.stringify(userData, null, 2)}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Authentication failed: ${errorMessage}`);
      addLog(`Sign in error: ${errorMessage}`);
      console.error('Sign in error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      addLog('Starting sign out process...');
      await signOut();
      addLog('Sign out completed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Sign out failed: ${errorMessage}`);
      addLog(`Sign out error: ${errorMessage}`);
      console.error('Sign out error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Welcome Back</Text>
        
        {/* Auth Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Status: {isLoading ? 'Loading...' : user ? 'Authenticated' : 'Not Authenticated'}
          </Text>
        </View>

        {/* Error Display */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Auth Button */}
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

        {/* Debug Logs */}
        <View style={styles.logsContainer}>
          <Text style={styles.logsTitle}>Debug Logs:</Text>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  scrollView: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: '#2f3542',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffd33d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
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
    padding: 8,
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    borderRadius: 8,
  },
  logsContainer: {
    backgroundColor: '#2f3542',
    padding: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  logsTitle: {
    color: '#ffd33d',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  logText: {
    color: '#ccc',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
}); 