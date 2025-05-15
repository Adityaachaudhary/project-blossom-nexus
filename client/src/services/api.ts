
import axios from 'axios';
import { Project } from '@/store/projectsSlice';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type for creating a new project
export interface CreateProjectRequest {
  title: string;
  description: string;
  budget: number;
  tech_stack: string[];
}

// Type for API response with pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Project services
export const projectService = {
  // Get all projects with optional filtering and pagination
  getProjects: async (params?: {
    skip?: number;
    limit?: number;
    tech?: string;
    min_budget?: number;
    max_budget?: number;
    status?: 'OPEN' | 'COMPLETED';
  }) => {
    try {
      const response = await api.get('/projects', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get a specific project by ID
  getProjectById: async (id: string) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  // Create a new project
  createProject: async (project: CreateProjectRequest) => {
    try {
      const response = await api.post('/projects', project);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update a project's status
  updateProjectStatus: async (id: string, status: 'COMPLETED') => {
    try {
      const response = await api.patch(`/projects/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating project ${id} status:`, error);
      throw error;
    }
  },
};

export default api;
