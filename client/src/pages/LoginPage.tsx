
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-12 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="glass-card rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <motion.div 
                className="inline-block mb-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                  F
                </div>
              </motion.div>
              <h1 className="text-2xl font-bold text-gradient">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sign in to access your account
              </p>
            </div>
            
            <form className="space-y-6">
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-600 transition-colors" />
              </motion.div>
              
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-600 transition-colors" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button 
                  type="submit" 
                  className="w-full btn-gradient relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></span>
                  <span>Sign In</span>
                </Button>
              </motion.div>
              
              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign Up
                </Link>
              </div>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" className="w-full flex items-center gap-2 border-2 hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-colors">
                  <Mail className="h-4 w-4" /> Google
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" className="w-full flex items-center gap-2 border-2 hover:border-purple-400 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-colors">
                  <Github className="h-4 w-4" /> GitHub
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
