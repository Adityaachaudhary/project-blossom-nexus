
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/store/projectsSlice";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="glass-card h-full flex flex-col overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold line-clamp-2">{project.title}</CardTitle>
            <div className={project.status === "OPEN" ? "status-open" : "status-completed"}>
              {project.status}
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag tag-primary">
                {tech}
              </span>
            ))}
          </div>
          <div className="budget-chip mt-2">₹{project.budget.toLocaleString()}</div>
        </CardContent>
        <CardFooter className="pt-3 border-t">
          <Button asChild variant="default" className="w-full" size="sm">
            <Link to={`/projects/${project.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
