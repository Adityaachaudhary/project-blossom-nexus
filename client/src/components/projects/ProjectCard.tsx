
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/store/projectsSlice";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { id, title, description, budget, tech_stack, status, created_at } = project;

  // Format date
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Truncate description
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={status === "OPEN" ? "status-open" : "status-completed"}>
            {status === "OPEN" ? "Open" : "Completed"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {formattedDate}
          </span>
        </div>

        <Link to={`/projects/${id}`}>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {truncateDescription(description, 120)}
        </p>

        <div className="flex items-center mb-4">
          <DollarSign className="h-5 w-5 text-green-600 dark:text-green-500 mr-1.5" />
          <span className="budget-chip">
            ${budget}
          </span>
        </div>

        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {tech_stack.slice(0, 3).map((tech: string, index: number) => (
              <span key={index} className="tag tag-primary">
                {tech}
              </span>
            ))}
            {tech_stack.length > 3 && (
              <span className="tag tag-primary">+{tech_stack.length - 3}</span>
            )}
          </div>
        </div>

        <Button asChild variant="outline" className="w-full group border-primary/50 hover:border-primary hover:bg-primary/5 dark:border-primary/30 dark:hover:border-primary">
          <Link to={`/projects/${id}`} className="flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
