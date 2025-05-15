
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { createProject } from "@/store/projectsSlice";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Project } from "@/store/projectsSlice";

interface ProjectFormData {
  title: string;
  description: string;
  budget: number;
  techStack: string;
}

const techOptions = [
  "React", "Angular", "Vue", "Node.js", "Express", "MongoDB", "PostgreSQL",
  "Python", "Django", "Flask", "PHP", "Laravel", "WordPress", "Shopify",
  "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS", "SASS/SCSS",
  "DevOps", "AWS", "Docker", "Mobile App", "React Native", "Flutter",
  "UI/UX Design", "Figma", "Adobe XD", "AI/ML", "Data Science"
];

const PostProjectForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<ProjectFormData>();

  const handleTechSelection = (tech: string) => {
    setSelectedTech((prevSelected) =>
      prevSelected.includes(tech)
        ? prevSelected.filter((t) => t !== tech)
        : [...prevSelected, tech]
    );
  };

  const onSubmit = async (data: ProjectFormData) => {
    if (selectedTech.length === 0) {
      toast.error("Please select at least one technology");
      return;
    }

    try {
      setIsSubmitting(true);
      const projectData = {
        title: data.title,
        description: data.description,
        budget: Number(data.budget),
        techStack: selectedTech
      };

      const resultAction = await dispatch(createProject(projectData));
      // Fixed TypeScript error by correctly typing the payload
      const newProject = resultAction.payload as Project;
      
      toast.success("Project posted successfully!");
      navigate(`/projects/${newProject.id}`);
    } catch (error) {
      toast.error("Failed to post project. Please try again.");
      console.error("Error posting project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Post a New Project</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            placeholder="Enter a descriptive title"
            {...register("title", { 
              required: "Title is required", 
              minLength: { value: 10, message: "Title should be at least 10 characters" } 
            })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your project requirements in detail"
            rows={6}
            {...register("description", { 
              required: "Description is required", 
              minLength: { value: 50, message: "Description should be at least 50 characters" } 
            })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (₹)</Label>
          <Controller
            name="budget"
            control={control}
            rules={{ 
              required: "Budget is required", 
              min: { value: 500, message: "Minimum budget is ₹500" } 
            }}
            render={({ field }) => (
              <Input
                id="budget"
                type="number"
                placeholder="Enter your budget in ₹"
                min={500}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            )}
          />
          {errors.budget && <p className="text-red-500 text-sm">{errors.budget.message}</p>}
        </div>
        
        <div className="space-y-3">
          <Label>Technology Stack</Label>
          <div className="flex flex-wrap gap-2">
            {techOptions.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechSelection(tech)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTech.includes(tech)
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
          {selectedTech.length === 0 && (
            <p className="text-amber-600 dark:text-amber-400 text-sm">
              Please select at least one technology
            </p>
          )}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting Project...
              </>
            ) : (
              "Post Project"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default PostProjectForm;
