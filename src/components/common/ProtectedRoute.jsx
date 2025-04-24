import { Navigate } from 'react-router-dom';
import UserService from '../service/UserService';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = UserService.isAuthenticated();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default ProtectedRoute;