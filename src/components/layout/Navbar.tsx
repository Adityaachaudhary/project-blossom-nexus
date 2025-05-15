
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-primary"
              >
                FreelanceHub
              </motion.div>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/projects" className="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Projects
              </Link>
              <Link to="/about" className="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button asChild variant="outline" className="mr-4">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="mr-4">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link to="/post-project">Post a Project</Link>
            </Button>
          </div>
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Home
          </Link>
          <Link to="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Projects
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            About
          </Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Contact
          </Link>
          <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Login
          </Link>
          <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Sign Up
          </Link>
          <Link to="/post-project" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-primary text-white">
            Post a Project
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
