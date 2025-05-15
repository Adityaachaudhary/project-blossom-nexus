
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
}

const initialState: ProjectsState = {
  projects: [],
  selectedProject: null,
  status: "idle",
  error: null,
};

// For now we'll use mockup data since we don't have a backend yet
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

// Mock API calls with thunks
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  // Mock API call
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 500);
  });
});

export const fetchProjectById = createAsyncThunk("projects/fetchProjectById", async (id: string) => {
  // Mock API call
  return new Promise<Project | undefined>((resolve) => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === id);
      resolve(project);
    }, 300);
  });
});

export const createProject = createAsyncThunk(
  "projects/createProject", 
  async (projectData: Omit<Project, "id" | "createdAt" | "status">) => {
    // Mock API call
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
);

export const updateProjectStatus = createAsyncThunk(
  "projects/updateProjectStatus", 
  async (id: string) => {
    // Mock API call
    return new Promise<{ id: string; status: "COMPLETED" }>((resolve) => {
      setTimeout(() => {
        resolve({ id, status: "COMPLETED" });
      }, 300);
    });
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearSelectedProject(state) {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
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

export const { clearSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;
