
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { projectService } from "@/services/api";

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  techStack: string[];
  status: "OPEN" | "COMPLETED";
  createdAt: string;
}

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: {
    tech: string | null;
    minBudget: number | null;
    maxBudget: number | null;
    status: "ALL" | "OPEN" | "COMPLETED";
  };
  pagination: {
    skip: number;
    limit: number;
    total: number;
  };
}

// Mock projects to use while backend is being set up
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Website Development",
    description: "Need a full-stack developer to build an e-commerce platform with React and Node.js. The platform should include product listings, shopping cart, and payment integration.",
    budget: 50000,
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    status: "OPEN",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Mobile App UI Design",
    description: "Looking for a UI/UX designer to create modern mobile app interfaces. Need wireframes, prototypes, and final designs.",
    budget: 30000,
    techStack: ["Figma", "Adobe XD", "UI/UX"],
    status: "OPEN",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "WordPress Blog Migration",
    description: "Need help migrating a WordPress blog to a new hosting provider with zero downtime.",
    budget: 5000,
    techStack: ["WordPress", "PHP", "MySQL"],
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    title: "Machine Learning Model Development",
    description: "Seeking an ML engineer to develop a recommendation system for our product catalog based on user behavior.",
    budget: 80000,
    techStack: ["Python", "TensorFlow", "Scikit-learn"],
    status: "OPEN",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "5",
    title: "DevOps Pipeline Setup",
    description: "Need to set up CI/CD pipelines using GitHub Actions and deploy to AWS.",
    budget: 25000,
    techStack: ["GitHub Actions", "AWS", "Docker"],
    status: "OPEN",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: "6",
    title: "Frontend Bug Fixes",
    description: "Multiple UI/UX issues need to be fixed in our React application.",
    budget: 8000,
    techStack: ["React", "CSS", "JavaScript"],
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
];

const initialState: ProjectsState = {
  projects: [],
  selectedProject: null,
  status: "idle",
  error: null,
  filters: {
    tech: null,
    minBudget: null,
    maxBudget: null,
    status: "ALL",
  },
  pagination: {
    skip: 0,
    limit: 10,
    total: 0,
  }
};

// Async thunks for API interactions
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { getState, rejectWithValue }) => {
    try {
      // For mocking API call during development
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_API) {
        return new Promise<Project[]>((resolve) => {
          setTimeout(() => {
            resolve(mockProjects);
          }, 500);
        });
      }
      
      const state = getState() as { projects: ProjectsState };
      const { filters, pagination } = state.projects;
      
      // Convert filters to API params
      const params: Record<string, any> = {
        skip: pagination.skip,
        limit: pagination.limit,
      };
      
      if (filters.tech) params.tech = filters.tech;
      if (filters.minBudget) params.min_budget = filters.minBudget;
      if (filters.maxBudget) params.max_budget = filters.maxBudget;
      if (filters.status !== "ALL") params.status = filters.status;
      
      const response = await projectService.getProjects(params);
      
      // Convert API response to our Project type
      const projects = response.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        budget: item.budget,
        techStack: item.tech_stack,
        status: item.status,
        createdAt: item.created_at,
      }));
      
      return projects;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to fetch projects");
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id: string, { rejectWithValue }) => {
    try {
      // For mocking API call during development
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_API) {
        return new Promise<Project | undefined>((resolve) => {
          setTimeout(() => {
            const project = mockProjects.find(p => p.id === id);
            resolve(project);
          }, 300);
        });
      }
      
      const response = await projectService.getProjectById(id);
      
      // Convert API response to our Project type
      return {
        id: response.id,
        title: response.title,
        description: response.description,
        budget: response.budget,
        techStack: response.tech_stack,
        status: response.status,
        createdAt: response.created_at,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to fetch project");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject", 
  async (projectData: Omit<Project, "id" | "createdAt" | "status">, { rejectWithValue }) => {
    try {
      // For mocking API call during development
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_API) {
        return new Promise<Project>((resolve) => {
          setTimeout(() => {
            const newProject: Project = {
              ...projectData,
              id: Math.random().toString(36).substr(2, 9),
              status: "OPEN",
              createdAt: new Date().toISOString(),
            };
            resolve(newProject);
          }, 500);
        });
      }
      
      const response = await projectService.createProject({
        title: projectData.title,
        description: projectData.description,
        budget: projectData.budget,
        tech_stack: projectData.techStack,
      });
      
      // Convert API response to our Project type
      return {
        id: response.id,
        title: response.title,
        description: response.description,
        budget: response.budget,
        techStack: response.tech_stack,
        status: response.status,
        createdAt: response.created_at,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to create project");
    }
  }
);

export const updateProjectStatus = createAsyncThunk(
  "projects/updateProjectStatus", 
  async (id: string, { rejectWithValue }) => {
    try {
      // For mocking API call during development
      if (process.env.NODE_ENV === 'development' && !import.meta.env.VITE_USE_API) {
        return new Promise<{ id: string; status: "COMPLETED" }>((resolve) => {
          setTimeout(() => {
            resolve({ id, status: "COMPLETED" });
          }, 300);
        });
      }
      
      const response = await projectService.updateProjectStatus(id, "COMPLETED");
      
      return { id, status: "COMPLETED" as const };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to update project status");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearSelectedProject(state) {
      state.selectedProject = null;
    },
    setTechFilter(state, action: PayloadAction<string | null>) {
      state.filters.tech = action.payload;
      state.pagination.skip = 0; // Reset pagination when filters change
    },
    setBudgetFilter(state, action: PayloadAction<{ min: number | null; max: number | null }>) {
      state.filters.minBudget = action.payload.min;
      state.filters.maxBudget = action.payload.max;
      state.pagination.skip = 0; // Reset pagination when filters change
    },
    setStatusFilter(state, action: PayloadAction<"ALL" | "OPEN" | "COMPLETED">) {
      state.filters.status = action.payload;
      state.pagination.skip = 0; // Reset pagination when filters change
    },
    setPage(state, action: PayloadAction<number>) {
      const skip = action.payload * state.pagination.limit;
      state.pagination.skip = skip;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProjects
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch projects";
      })
      
      // fetchProjectById
      .addCase(fetchProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProject = action.payload || null;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch project";
      })
      
      // createProject
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      
      // updateProjectStatus
      .addCase(updateProjectStatus.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index].status = action.payload.status;
        }
        if (state.selectedProject && state.selectedProject.id === action.payload.id) {
          state.selectedProject.status = action.payload.status;
        }
      });
  },
});

export const { 
  clearSelectedProject,
  setTechFilter,
  setBudgetFilter,
  setStatusFilter,
  setPage
} = projectsSlice.actions;

export default projectsSlice.reducer;
