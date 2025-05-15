
import { motion } from "framer-motion";
import ProjectList from "@/components/projects/ProjectList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Browse Projects</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Find the perfect project that matches your skills
              </p>
            </div>
            <Button asChild>
              <Link to="/post-project">Post a Project</Link>
            </Button>
          </div>
          
          <ProjectList />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;
