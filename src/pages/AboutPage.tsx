
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About FreelanceHub</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg">
                FreelanceHub is a modern platform connecting talented freelancers with businesses and individuals seeking their services. Our mission is to create a seamless experience for both clients and freelancers, fostering productive collaborations and successful project outcomes.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
              <p>
                We believe in creating a world where talent knows no boundaries. Our platform empowers freelancers to showcase their skills to a global audience while giving businesses access to a diverse pool of professionals who can help turn their ideas into reality.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>A secure and intuitive platform for posting and finding projects</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Tools for effective communication between clients and freelancers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Fair and transparent payment protection</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Verified profiles and reviews to build trust</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">✓</span>
                  <span>Support for multiple project types across various industries</span>
                </li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4">Join Our Community</h2>
              <p className="mb-6">
                Whether you're looking to hire talent or showcase your skills, FreelanceHub provides the tools and support you need to succeed. Join thousands of satisfied users who have found the perfect match for their projects.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg">
                  <Link to="/projects">Browse Projects</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/post-project">Post a Project</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
