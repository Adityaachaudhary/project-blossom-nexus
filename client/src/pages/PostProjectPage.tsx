
import { motion } from "framer-motion";
import PostProjectForm from "@/components/projects/PostProjectForm";

const PostProjectPage = () => {
  return (
    <div className="py-10 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <PostProjectForm />
        </motion.div>
      </div>
    </div>
  );
};

export default PostProjectPage;
