
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinkClasses = "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors relative link-underline";
  const activeNavLinkClasses = "text-primary dark:text-primary font-medium";

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-lg" : "bg-transparent dark:bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">F</div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">FreelanceHub</span>
              </motion.div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-6">
              <Link to="/" className={`${navLinkClasses} ${isActive("/") ? activeNavLinkClasses : ""}`}>
                Home
              </Link>
              <Link to="/projects" className={`${navLinkClasses} ${isActive("/projects") ? activeNavLinkClasses : ""}`}>
                Projects
              </Link>
              <Link to="/about" className={`${navLinkClasses} ${isActive("/about") ? activeNavLinkClasses : ""}`}>
                About
              </Link>
              <Link to="/contact" className={`${navLinkClasses} ${isActive("/contact") ? activeNavLinkClasses : ""}`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-colors">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="border-2 hover:border-primary hover:bg-primary/5 transition-all">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 hover:shadow-glow transition-all">
              <Link to="/post-project">Post a Project</Link>
            </Button>
          </div>
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                Home
              </Link>
              <Link to="/projects" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/projects") ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                Projects
              </Link>
              <Link to="/about" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/about") ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                About
              </Link>
              <Link to="/contact" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/contact") ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>
                Contact
              </Link>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                Login
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                Sign Up
              </Link>
              <Link to="/post-project" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
                Post a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
