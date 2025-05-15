
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSelectedProject } from "@/store/projectsSlice";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.projects);
  
  useEffect(() => {
    return () => {
      dispatch(clearSelectedProject());
    };
  }, [dispatch]);

  return (
    <div className="py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2"
              onClick={() => navigate('/projects')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </Button>
          </motion.div>
          
          {status === "failed" ? (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg mb-4">Error: {error}</p>
              <Button onClick={() => navigate('/projects')}>
                Return to Projects
              </Button>
            </div>
          ) : (
            <ProjectDetail />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
