// src/pages/admin/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { api } from '../../services/api';
import UserTable from '../../components/admin/UserTable';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const GOLD = '#D4AF37';

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const response = await api.fetchUsers();
      if (response.success) {
        setUsers(response.users);
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error fetching users list.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await api.deleteUser(userId);
      if (response.success) {
        setMessage({ type: 'success', text: response.message });
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        setMessage({ type: 'warning', text: response.message });
      }
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'An error occurred during deletion.',
      });
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const response = await api.updateUserRole(userId, newRole);
      if (response.success) {
        setMessage({ type: 'success', text: response.message });
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (error) {
      setMessage({
        type: 'danger',
        text: 'An error occurred while updating the role.',
      });
    }
  };

  return (
    <Container fluid className="p-0">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: GOLD }}>
            Manage Users
          </h2>
          <p className="mb-0 ">
            View, promote, or remove users from the GoHome platform.
          </p>
        </div>
      </div>

      {message && (
        <Alert
          variant={message.type}
          onClose={() => setMessage(null)}
          dismissible
          className="mb-3"
        >
          {message.text}
        </Alert>
      )}

      <Card className="card-custom">
        <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
          <span>All Registered Users</span>
          <span
            style={{
              fontSize: '0.8rem',
              color: '#c9c9c9',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            Total: {users.length}
          </span>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
              <p className="mt-2 text-muted">Loading users list...</p>
            </div>
          ) : (
            <UserTable
              users={users}
              onDelete={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManageUsers;
