import { Navigate } from 'react-router-dom';

export default function RequireAuth({ role, children }) {
  const loggedIn = localStorage.getItem('isLoggedIn') === 'true' && Boolean(localStorage.getItem('token'));
  const userType = localStorage.getItem('userType');
  if (!loggedIn) return <Navigate to="/login" replace />;
  if (role && userType !== role) return <Navigate to={userType === 'ngo' ? '/ngo-dashboard' : '/restaurant-dashboard'} replace />;
  return children;
}
