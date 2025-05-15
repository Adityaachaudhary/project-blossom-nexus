
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/projectsSlice";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { projects, status, error } = useAppSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OPEN" | "COMPLETED">("ALL");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  // Extract all unique tech stacks for filtering
  const allTechStacks = Array.from(
    new Set(projects.flatMap((project) => project.techStack))
  ).sort();

  // Apply filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTechFilter ? project.techStack.includes(selectedTechFilter) : true;
    const matchesStatus = statusFilter === "ALL" ? true : project.status === statusFilter;
    
    return matchesSearch && matchesTech && matchesStatus;
  });

  if (status === "loading" && projects.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-lg">Loading projects...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
        <Button onClick={() => dispatch(fetchProjects())} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-sm">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedTechFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTechFilter(null)}
          >
            All Technologies
          </Button>
          {allTechStacks.map((tech: string) => (
            <Button
              key={tech}
              variant={selectedTechFilter === tech ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTechFilter(tech === selectedTechFilter ? null : tech)}
            >
              {tech}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "ALL" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("ALL")}
          >
            All Status
          </Button>
          <Button
            variant={statusFilter === "OPEN" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("OPEN")}
          >
            Open
          </Button>
          <Button
            variant={statusFilter === "COMPLETED" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("COMPLETED")}
          >
            Completed
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ProjectList;
