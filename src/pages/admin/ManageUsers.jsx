// src/pages/admin/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import { api } from '../../services/api';
import UserTable from '../../components/admin/UserTable';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null); // For success/error messages

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

    // --- Action Handlers ---

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await api.deleteUser(userId);
            if (response.success) {
                setMessage({ type: 'success', text: response.message });
                // Optimistically remove the user from the state
                setUsers(users.filter(user => user.id !== userId));
            } else {
                setMessage({ type: 'warning', text: response.message });
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred during deletion.' });
        }
    };

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const response = await api.updateUserRole(userId, newRole);
            if (response.success) {
                setMessage({ type: 'success', text: response.message });
                // Update the user's role in the local state
                setUsers(users.map(user => 
                    user.id === userId ? { ...user, role: newRole } : user
                ));
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred while updating the role.' });
        }
    };


    return (
        <Container fluid className="p-0">
            <h2 className="mb-4 fw-bold">👥 Manage Users</h2>
            
            {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.text}</Alert>}

            <Card className="card-custom">
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
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