
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { projectService } from "@/services/api";

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  tech_stack: string[];
  status: "OPEN" | "COMPLETED";
  created_at: string;
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

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectService.getProjects();
      return response;
    } catch (err) {
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await projectService.getProjectById(id);
      return response;
    } catch (err) {
      return rejectWithValue(`Failed to fetch project with ID: ${id}`);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: any, { rejectWithValue }) => {
    try {
      const response = await projectService.createProject(project);
      return response;
    } catch (err) {
      return rejectWithValue("Failed to create project");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
      // Fetch Project By ID
      .addCase(fetchProjectById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectById.fulfilled, (state, action: PayloadAction<Project>) => {
        state.status = "succeeded";
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.status = "succeeded";
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedProject } = projectsSlice.actions;
export default projectsSlice.reducer;
