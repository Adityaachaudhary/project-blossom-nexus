
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Users, Zap, CheckCircle } from "lucide-react";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 relative hero-glow">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">
                Find Expert Freelancers & <span className="text-gradient">Amazing Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Connect with top talent or discover exciting opportunities on the leading freelance marketplace
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-gradient relative overflow-hidden">
                  <Link to="/projects">
                    <span className="absolute inset-0 w-[400%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></span>
                    <span className="relative z-10">Explore Projects</span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-purple-400 hover:border-purple-500 dark:border-purple-600 dark:hover:border-purple-500">
                  <Link to="/post-project" className="flex items-center">
                    Post a Project <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 glass-card">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Freelancers collaborating" 
                  className="w-full object-cover rounded-t-xl" 
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      FEATURED
                    </span>
                    <span className="text-sm text-gray-500">Posted 2 days ago</span>
                  </div>
                  <h3 className="text-xl font-semibold">Modern E-Commerce Platform Development</h3>
                  <p className="line-clamp-2 text-gray-600 dark:text-gray-300">Looking for a skilled developer to build a responsive e-commerce platform with modern design and seamless payment integration.</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="tag tag-primary">React</span>
                    <span className="tag tag-primary">Node.js</span>
                    <span className="tag tag-primary">MongoDB</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="budget-chip font-medium">₹25,000</span>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/projects">View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -top-5 -right-10 bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg shadow-lg border border-purple-200 dark:border-purple-800/30 hidden md:block"
              >
                <span className="text-purple-700 dark:text-purple-400 text-sm font-medium">500+ Active Projects</span>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-8 -left-12 bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800/30 hidden md:block"
              >
                <span className="text-blue-700 dark:text-blue-400 text-sm font-medium">1,200+ Expert Freelancers</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreelanceHub?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We've built a platform that makes it simple to find the perfect match for your project or showcase your talents.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Layers className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
              title="Quality Projects"
              description="Browse through carefully vetted projects across various industries and technologies."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
              title="Talented Freelancers"
              description="Connect with skilled professionals with proven experience and portfolios."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="h-6 w-6 text-pink-600 dark:text-pink-400" />}
              title="Fast Matching"
              description="Our smart algorithm helps you find the perfect match for your specific needs quickly."
              delay={0.3}
            />
            <FeatureCard 
              icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
              title="Secure Payments"
              description="Escrow payment protection ensures you only pay for completed work you're satisfied with."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of satisfied users who have found the perfect match for their projects.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 hover:text-purple-700 transition-colors">
                  <Link to="/register">Create an Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/20">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Don't just take our word for it. Here's what our community has to say about FreelanceHub.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="I found the perfect developer for my project within days. The quality of talent on this platform is exceptional."
              name="Priya Sharma"
              role="Project Manager"
              imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120"
              delay={0.1}
            />
            <TestimonialCard 
              quote="As a freelancer, I've been able to find consistent work that matches my skills and interests. The platform is intuitive and client communication is seamless."
              name="Raj Patel"
              role="Full-Stack Developer"
              imageSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120"
              delay={0.2}
            />
            <TestimonialCard 
              quote="FreelanceHub has transformed how our startup handles project outsourcing. We've built relationships with amazing freelancers who feel like part of our team."
              name="Aisha Khan"
              role="Startup Founder"
              imageSrc="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120"
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ quote, name, role, imageSrc, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center mb-4">
        <div className="rounded-full overflow-hidden mr-4 ring-2 ring-purple-500/50">
          <img 
            src={imageSrc} 
            alt={name} 
            className="w-12 h-12 object-cover" 
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic">"{quote}"</p>
    </motion.div>
  );
};

export default HomePage;
