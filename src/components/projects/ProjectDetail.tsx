
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectById, updateProjectStatus } from "@/store/projectsSlice";
import { toast } from "sonner";

interface ProjectDetailProps {
  isPreview?: boolean;
}

const ProjectDetail = ({ isPreview = false }: ProjectDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProject, status } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (!isPreview && id) {
      dispatch(fetchProjectById(id));
    }
  }, [dispatch, id, isPreview]);

  const handleMarkAsCompleted = async () => {
    if (id) {
      await dispatch(updateProjectStatus(id));
      toast.success("Project marked as completed!");
    }
  };

  if (status === "loading" && !selectedProject) {
    return (
      <div className="w-full py-20 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-lg">Loading project details...</p>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Project not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">The project you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/projects')} className="mt-6">
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h1>
        <div className={selectedProject.status === "OPEN" ? "status-open" : "status-completed"}>
          {selectedProject.status}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-3">Project Description</h3>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
              {selectedProject.description}
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className="tag tag-primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {!isPreview && selectedProject.status === "OPEN" && (
            <div className="mt-8">
              <Button onClick={handleMarkAsCompleted} size="lg">
                Mark as Completed
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Budget</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{selectedProject.budget.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Posted On</p>
                <p className="font-medium">
                  {new Date(selectedProject.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Project ID</p>
                <p className="font-medium text-sm">{selectedProject.id}</p>
              </div>
            </div>
            
            {!isPreview && (
              <div className="mt-8">
                <Button variant="outline" className="w-full">
                  Apply for This Project
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
