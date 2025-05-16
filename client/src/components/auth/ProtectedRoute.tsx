
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // Check if the user is authenticated
  const authenticated = isAuthenticated();
  
  useEffect(() => {
    if (!authenticated && !['/login', '/register'].includes(location.pathname)) {
      toast({
        title: "Authentication required",
        description: "Please login to access this page",
        variant: "destructive"
      });
    }
  }, [authenticated, location.pathname]);

  // If not authenticated, redirect to login page with the return URL
  if (!authenticated && !['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
