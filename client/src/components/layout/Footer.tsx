
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">F</div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">FreelanceHub</span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Connect with top freelancers or find exciting projects on our marketplace. Post a project or apply for one that matches your skills.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ y: -3 }}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Browse Projects</Link>
              </li>
              <li>
                <Link to="/post-project" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Post a Project</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Help Center</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">support@freelancehub.com</span>
              </li>
              <li>
                <Link to="/contact" className="inline-flex items-center text-primary hover:underline">
                  Contact Us
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">© {currentYear} FreelanceHub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-600 dark:text-gray-300 text-sm hover:text-primary dark:hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="text-gray-600 dark:text-gray-300 text-sm hover:text-primary dark:hover:text-primary transition-colors">Privacy</Link>
            <a href="#" className="text-gray-600 dark:text-gray-300 text-sm hover:text-primary dark:hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
