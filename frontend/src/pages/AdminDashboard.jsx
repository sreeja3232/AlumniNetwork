// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AdminDashboard.css'; // Make sure to create and import this CSS file

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [recentRegistrations, setRecentRegistrations] = useState([]);
//   const [showAddUserForm, setShowAddUserForm] = useState(false);
//   const [newUser, setNewUser] = useState({ username: '', password: '' });
//   const [showNotifications, setShowNotifications] = useState(false);

//   useEffect(() => {
//     // Replace with actual API calls
//     const fetchNotifications = async () => {
//       const res = await axios.get('/api/notifications');
//       setNotifications(res.data);
//     };

//     const fetchRecentRegistrations = async () => {
//       const res = await axios.get('/api/users/recent');
//       setRecentRegistrations(res.data);
//     };

//     fetchNotifications();
//     fetchRecentRegistrations();
//   }, []);

//   const handleAddUserSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/users', newUser);
//       setRecentRegistrations([...recentRegistrations, res.data]);
//       setNewUser({ username: '', password: '' });
//       setShowAddUserForm(false);
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const logout = () => {
//     // Implement logout functionality, e.g., clearing user data, tokens
//     navigate('/login');
//   };

//   return (
//     <div className="admin-dashboard">
//       <nav>
//         <div>Admin Dashboard</div>
//         <div>
//           <button onClick={() => setShowNotifications(!showNotifications)}>
//             Notifications {notifications.length > 0 ? `(${notifications.length})` : ''}
//           </button>
//           <button onClick={logout}>Logout</button>
//         </div>
//       </nav>
//       {showNotifications && (
//         <div className="notifications-modal">
//           {notifications.map((notification, index) => (
//             <div key={index}>{notification.message}</div>
//           ))}
//         </div>
//       )}
//       <aside>
//         <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
//           Add New User
//         </button>
//       </aside>
//       <main>
//         {showAddUserForm && (
//           <form onSubmit={handleAddUserSubmit}>
//             <input
//               name="username"
//               value={newUser.username}
//               onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//               placeholder="Username"
//               required
//             />
//             <input
//               name="password"
//               type="password"
//               value={newUser.password}
//               onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
//               placeholder="Password"
//               required
//             />
//             <button type="submit">Add User</button>
//           </form>
//         )}
//         <h2>Recent Registrations</h2>
//         <ul>
//           {recentRegistrations.map((reg, index) => (
//             <li key={index}>{`${reg.username} - Registered at ${new Date(reg.registeredAt).toLocaleDateString()}`}</li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Ensure the path is correct

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [showNotifications, setShowNotifications] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchRecentRegistrations = async () => {
      try {
        const response = await axios.get('/api/users/recent');
        setRecentRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching recent registrations:', error);
      }
    };

    fetchNotifications();
    fetchRecentRegistrations();
  }, []);

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.username || !newUser.password) {
      setFeedbackMessage('Please fill in all fields.');
      return;
    }
    try {
      await axios.post('/api/users', newUser);
      setRecentRegistrations(prevRegistrations => [...prevRegistrations, newUser]);
      setNewUser({ username: '', password: '' });
      setShowAddUserForm(false);
      setFeedbackMessage('User added successfully.');
    } catch (error) {
      setFeedbackMessage('Error adding user: ' + (error.response?.data.message || 'Please try again.'));
    }
  };

  return (
    <div className="admin-dashboard">
      <nav>
        <div>Admin Dashboard</div>
        <div>
          <button onClick={() => setShowNotifications(!showNotifications)}>
            Notifications {notifications.length > 0 ? `(${notifications.length})` : ''}
          </button>
          <button onClick={() => navigate('/login')}>Logout</button>
        </div>
      </nav>
      {showNotifications && (
        <div className="notifications-modal">
          {notifications.map((notification, index) => (
            <div key={index}>{notification.message}</div>
          ))}
        </div>
      )}
      <aside>
        <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
          Add New User
        </button>
      </aside>
      <main>
        {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
        {showAddUserForm && (
          <form onSubmit={handleAddUserSubmit}>
            <input
              name="username"
              value={newUser.username}
              placeholder="Username"
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
            />
            <input
              name="password"
              type="password"
              value={newUser.password}
              placeholder="Password"
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <button type="submit">Add User</button>
          </form>
        )}
        <h2>Recent Registrations</h2>
        <ul>
          {recentRegistrations.map((reg, index) => (
            <li key={index}>{`${reg.username} - Registered at ${new Date(reg.registeredAt).toLocaleDateString()}`}</li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AdminDashboard;
