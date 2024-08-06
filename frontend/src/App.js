

import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Adjust the path as needed
import Navbar from './components/Navbar/Navbar';
import Login from './pages/login';
import Register from './pages/register';
import Events from './pages/events';
import Careers from './pages/careers';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="blur-background" onClick={() => navigate('/login')}>
        <button style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
          Login to View
        </button>
      </div>
    );
  }

  return children;
};

function App() {
  const contactRef = useRef(null);
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AuthProvider>
      <div className="app-container">
        <BrowserRouter>
          <Navbar onContactClick={scrollToContact} />
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/events' element={<ProtectedRoute><Events /></ProtectedRoute>}/>
            <Route path='/careers' element={<ProtectedRoute><Careers /></ProtectedRoute>}/>
            {/* Additional routes here */}
          </Routes>
          <div ref={contactRef}><Contact /></div>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
