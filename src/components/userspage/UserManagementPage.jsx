// components/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../service/UserService';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList || []);
    } catch (error) {
      setError('Failed to fetch users: ' + error.message);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        await UserService.deleteUser(userId, token);
        await fetchUsers(); // Refresh the list after deletion
      }
    } catch (error) {
      setError('Failed to delete user: ' + error.message);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-management-container">
      <div className="header-section">
        <h2>Users Management</h2>
        <Link to="/register" className="add-user-button">
          Add New User
        </Link>
      </div>

      {users.length === 0 ? (
        <p className="no-users">No users found</p>
      ) : (
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.city || 'N/A'}</td>
                  <td className="action-buttons">
                    <Link 
                      to={`/update-user/${user.id}`}
                      className="update-button"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManagementPage;
