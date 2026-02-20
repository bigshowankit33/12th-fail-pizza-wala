import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin');
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
