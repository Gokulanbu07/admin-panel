// src/components/admin/BookingTable.jsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const BookingTable = ({ bookings, onUpdateStatus }) => {
    // Utility to get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepted': return <span className="badge bg-success">Accepted</span>;
            case 'rejected': return <span className="badge bg-danger">Rejected</span>;
            case 'pending': return <span className="badge bg-warning text-dark">Pending</span>;
            default: return <span className="badge bg-secondary">N/A</span>;
        }
    };

    const formatDate = (datetime) => {
        // Simple formatting for display
        if (!datetime) return 'N/A';
        const date = new Date(datetime);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="table-responsive">
            <Table striped hover className="table-custom shadow-sm rounded-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Property</th>
                        <th>Requester</th>
                        <th>Visit Date/Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.property_title}</td>
                            <td>{booking.user_name}</td>
                            <td>{formatDate(booking.visit_datetime)}</td>
                            <td>{getStatusBadge(booking.status)}</td>
                            <td>
                                {booking.status === 'pending' ? (
                                    <>
                                        <Button 
                                            variant="success" 
                                            size="sm" 
                                            className="me-2"
                                            onClick={() => onUpdateStatus(booking.id, 'accepted')}
                                        >
                                            <i className="fas fa-check"></i> Accept
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => onUpdateStatus(booking.id, 'rejected')}
                                        >
                                            <i className="fas fa-times"></i> Reject
                                        </Button>
                                    </>
                                ) : (
                                    <span className="text-muted" style={{fontSize: '0.9rem'}}>Action Done</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default BookingTable;