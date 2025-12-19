import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import HRDashboard from './HRDashboard';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === 'HR') {
    return <HRDashboard />;
  }

  return <EmployeeDashboard />;
};

export default Dashboard;
