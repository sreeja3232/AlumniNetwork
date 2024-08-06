

// ProtectedRoute.js
import React from 'react';
import { useAuth } from '../../AuthContext'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import './ProtectedRoute.css'; // Assuming the CSS is in the same directory

const ProtectedRoute = ({ children }) => {
    const { user, setLastVisitedPage } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        // Set the last attempted path before redirecting to login
        setLastVisitedPage(window.location.pathname);

        return (
            <div className="blur-background">
                <button onClick={() => navigate('/login')} style={buttonStyle}>
                    Login
                </button>
            </div>
        );
    }

    return children;
};

const buttonStyle = {
    position: 'fixed', // Use fixed to ensure it's centered regardless of page content
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
};

export default ProtectedRoute;
