import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { PostsApi } from '../api/posts';
import { Post } from '../types/post';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/auth';

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await PostsApi.getAll();
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await PostsApi.delete(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffd33d" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.logoutButton}
        onPress={signOut}
      >
        <MaterialIcons name="logout" size={24} color="#fff" />
      </Pressable>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
            <View style={styles.actions}>
              <Pressable 
                style={styles.button}
                onPress={() => {
                  router.push({
                    pathname: '/posts/[id]',
                    params: { id: item.id }
                  });
                }}
              >
                <MaterialIcons name="edit" size={20} color="#fff" />
              </Pressable>
              <Pressable 
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(item.id)}
              >
                <MaterialIcons name="delete" size={20} color="#fff" />
              </Pressable>
            </View>
          </View>
        )}
      />
      <Pressable 
        style={styles.fab}
        onPress={() => {
          router.push('/posts/new');
        }}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
  },
  postCard: {
    backgroundColor: '#2f3542',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    color: '#ccc',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    padding: 8,
    backgroundColor: '#ffd33d',
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4757',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#ffd33d',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  errorText: {
    color: '#ff4757',
    textAlign: 'center',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    top: 8,
    right: 16,
    zIndex: 1,
  },
}); 