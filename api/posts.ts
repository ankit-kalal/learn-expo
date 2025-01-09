import { api } from './config';
import { Post, CreatePostDto, UpdatePostDto } from '../types/post';

export const PostsApi = {
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  },

  getById: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  create: async (data: CreatePostDto): Promise<Post> => {
    const response = await api.post<Post>('/posts', data);
    return response.data;
  },

  update: async (id: number, data: UpdatePostDto): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
}; 