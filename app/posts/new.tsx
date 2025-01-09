import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { PostsApi } from '../../api/posts';
import { CreatePostDto } from '../../types/post';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async () => {
    try {
      setIsSaving(true);
      const newPost: CreatePostDto = {
        title,
        body,
        userId: 1, // Using a dummy userId
      };
      await PostsApi.create(newPost);
      router.back();
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Post title"
          placeholderTextColor="#666"
        />
        <TextInput
          style={[styles.input, styles.bodyInput]}
          value={body}
          onChangeText={setBody}
          placeholder="Post body"
          placeholderTextColor="#666"
          multiline
        />
        <Pressable 
          style={[styles.button, isSaving && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={isSaving}
        >
          <Text style={styles.buttonText}>
            {isSaving ? 'Creating...' : 'Create Post'}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 16,
  },
  input: {
    backgroundColor: '#2f3542',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  bodyInput: {
    height: 150,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ffd33d',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
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
}); 