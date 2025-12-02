// src/components/admin/PropertyTable.jsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PropertyTable = ({ properties, onDelete, onEdit }) => {
    // Utility to get status badge color
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Available': return <span className="badge bg-success">Available</span>;
            case 'Rented': return <span className="badge bg-warning text-dark">Rented</span>;
            case 'Archived': return <span className="badge bg-danger">Archived</span>;
            default: return <span className="badge bg-secondary">N/A</span>;
        }
    };

    return (
        <div className="table-responsive">
            <Table striped hover className="table-custom shadow-sm rounded-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Price/Mo</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property.id}>
                            <td>{property.id}</td>
                            <td>
                                <img 
                                    src={property.main_image} 
                                    alt={property.title} 
                                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            </td>
                            <td>{property.title}</td>
                            <td>{property.owner_name}</td>
                            <td>₹{property.price.toLocaleString()}</td>
                            <td>{getStatusBadge(property.status)}</td>
                            <td>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    className="me-2 text-white"
                                    onClick={() => onEdit(property.id)}
                                >
                                    <i className="fas fa-edit"></i>
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => onDelete(property.id)}
                                >
                                    <i className="fas fa-archive"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PropertyTable;


