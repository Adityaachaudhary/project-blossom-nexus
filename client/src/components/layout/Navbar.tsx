
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scroll listener for navbar blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if link is active
  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold mr-2">
                  F
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500">
                  FreelanceHub
                </span>
              </motion.div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLink to="/" active={isLinkActive("/")}>
                Home
              </NavLink>
              <NavLink to="/projects" active={isLinkActive("/projects")}>
                Projects
              </NavLink>
              <NavLink to="/about" active={isLinkActive("/about")}>
                About
              </NavLink>
              <NavLink to="/contact" active={isLinkActive("/contact")}>
                Contact
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="outline" className="border-gray-200 hover:border-primary dark:border-gray-700 transition-colors">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-200 hover:border-primary dark:border-gray-700 transition-colors">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-all duration-300">
              <Link to="/post-project">Post a Project</Link>
            </Button>
          </div>
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink to="/" active={isLinkActive("/")}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/projects" active={isLinkActive("/projects")}>
                Projects
              </MobileNavLink>
              <MobileNavLink to="/about" active={isLinkActive("/about")}>
                About
              </MobileNavLink>
              <MobileNavLink to="/contact" active={isLinkActive("/contact")}>
                Contact
              </MobileNavLink>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <MobileNavLink to="/login" active={isLinkActive("/login")}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/register" active={isLinkActive("/register")}>
                  Sign Up
                </MobileNavLink>
              </div>
              
              <div className="pt-2">
                <Link 
                  to="/post-project"
                  className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                >
                  Post a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Desktop navigation link
const NavLink = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? "text-primary" 
          : "text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
};

// Mobile navigation link
const MobileNavLink = ({ to, active, children }) => {
  return (
    <Link 
      to={to} 
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
        active 
          ? "bg-purple-50 dark:bg-purple-900/20 text-primary" 
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
