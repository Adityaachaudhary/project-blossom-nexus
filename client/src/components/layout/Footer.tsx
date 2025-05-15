
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    (e.target as HTMLFormElement).reset();
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold mr-2">
                F
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500">
                FreelanceHub
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Connecting talented freelancers with amazing projects worldwide.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} label="Facebook" />
              <SocialIcon icon={<Twitter size={18} />} label="Twitter" />
              <SocialIcon icon={<Instagram size={18} />} label="Instagram" />
              <SocialIcon icon={<Github size={18} />} label="Github" />
            </div>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/projects">Find Projects</FooterLink>
              <FooterLink to="/post-project">Post a Project</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest updates and news directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                required
                className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-600 transition-colors"
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} FreelanceHub. All rights reserved.
          </p>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 inline" /> in India
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to}
      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, label }) => (
  <motion.a
    href="#"
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 p-2 rounded-full transition-colors"
  >
    {icon}
  </motion.a>
);

export default Footer;
