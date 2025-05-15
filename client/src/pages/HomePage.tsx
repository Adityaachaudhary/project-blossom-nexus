
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle, Clock, DollarSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/projectsSlice";
import ProjectCard from "@/components/projects/ProjectCard";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { projects, status } = useAppSelector((state) => state.projects);
  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);
  
  // Take only the first 3 projects for the featured section
  const featuredProjects = projects.slice(0, 3);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 hero-glow">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 dark:from-gray-900/50 to-white dark:to-gray-900 -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Hero Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-2xl"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gradient"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Find The Perfect Project Or Talented Freelancer
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Connect with top freelancers or find exciting projects on our marketplace. Post a project or apply for one that matches your skills.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Button asChild size="lg" className="rounded-full text-lg px-8 btn-gradient">
                  <Link to="/post-project">Post a Project</Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="rounded-full text-lg px-8 border-2 border-purple-400 dark:border-purple-600">
                  <Link to="/projects">Browse Projects</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Hero Image/Illustration */}
            <motion.div
              className="hidden lg:flex justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 border border-purple-100 dark:border-purple-900/30 rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                  alt="Freelancer working"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg shadow-lg border border-purple-200 dark:border-purple-700/50 -rotate-3">
                  <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4 text-gradient"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Why Choose Our Platform
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our marketplace connects talented freelancers with exciting projects from clients worldwide
            </motion.p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div 
              className="glass-card rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-900/30"
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Diverse Projects</h3>
              <p className="text-gray-600 dark:text-gray-300">Find projects across various industries and technologies.</p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="glass-card rounded-xl p-6 shadow-lg border border-blue-100 dark:border-blue-900/30"
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vetted Talent</h3>
              <p className="text-gray-600 dark:text-gray-300">Connect with skilled freelancers ready to deliver quality work.</p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="glass-card rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-900/30"
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Budgets</h3>
              <p className="text-gray-600 dark:text-gray-300">Set your own budget and find projects that match your price range.</p>
            </motion.div>
            
            {/* Feature 4 */}
            <motion.div 
              className="glass-card rounded-xl p-6 shadow-lg border border-amber-100 dark:border-amber-900/30"
              variants={fadeIn}
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600 dark:text-gray-300">Get your projects completed efficiently and on schedule.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <motion.h2 
              className="text-3xl font-bold text-gradient"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="ghost" className="group">
                <Link to="/projects" className="flex items-center gap-2">
                  View all projects
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {status === "loading" && featuredProjects.length === 0 ? (
            <div className="flex justify-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeIn}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
              
              {featuredProjects.length === 0 && (
                <div className="col-span-3 text-center py-12">
                  <p className="text-xl text-gray-600 dark:text-gray-300">No projects available at the moment.</p>
                  <Button asChild className="mt-4 btn-gradient">
                    <Link to="/post-project">Post a Project</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-cta-gradient text-white animated-gradient">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Start Your Next Project?</h2>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              Join thousands of clients and freelancers already using our platform to connect and collaborate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-8 shadow-glow animate-pulse-glow">
                <Link to="/post-project">Post a Project</Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-transparent text-white border-white hover:bg-white/10">
                <Link to="/projects">Browse Projects</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
