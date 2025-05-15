
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjectById, updateProjectStatus } from "@/store/projectsSlice";
import { toast } from "sonner";
import { Clock, CheckCircle, Tag, DollarSign, Calendar, Loader2, ArrowUpRight } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
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
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{selectedProject.title}</h1>
          <div className="flex items-center gap-3 mt-2 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {new Date(selectedProject.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm">₹{selectedProject.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className={`${
          selectedProject.status === "OPEN" 
            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        } px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-medium`}>
          {selectedProject.status === "OPEN" ? (
            <Clock className="w-4 h-4" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          {selectedProject.status}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Project Description
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <motion.span 
                    key={tech} 
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary-foreground rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          
          {!isPreview && selectedProject.status === "OPEN" && (
            <div className="mt-8">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Mark as Completed
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mark project as completed?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Once marked as completed, the project will no longer be listed as open.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleMarkAsCompleted}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
                <Button variant="outline" className="w-full flex items-center gap-2">
                  Apply for This Project
                  <ArrowUpRight className="h-4 w-4" />
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
