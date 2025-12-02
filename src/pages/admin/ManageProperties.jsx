// src/pages/admin/ManageProperties.jsx (UPDATED)
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner, Button } from 'react-bootstrap';
import { api } from '../../services/api';
import PropertyTable from '../../components/admin/PropertyTable';
import PropertyFormModal from '../../components/admin/PropertyFormModal'; // <--- IMPORT MODAL

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    
    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null); // Null for Add, Object for Edit

    const fetchPropertiesData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchProperties();
            if (response.success) {
                // Ensure the properties have all required fields for the form
                setProperties(response.properties.map(p => ({
                    ...p,
                    bedrooms: p.bedrooms || 0,
                    bathrooms: p.bathrooms || 0,
                    sq_ft: p.sq_ft || 0,
                })));
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error fetching properties list.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPropertiesData();
    }, []);

    // --- Modal Handlers ---

    const handleShowAdd = () => {
        setCurrentProperty(null); // Clear for Add mode
        setShowModal(true);
    };

    const handleShowEdit = (propertyId) => {
        const propertyToEdit = properties.find(p => p.id === propertyId);
        setCurrentProperty(propertyToEdit);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProperty(null);
    };

    // --- Action Handlers ---

    const handleFormSubmit = (formData) => {
        setMessage(null);
        if (currentProperty) {
            // EDIT LOGIC
            setMessage({ type: 'success', text: `Successfully updated property: ${formData.title}. (Mock update)` });
            // Update local state to reflect changes (Mock)
            setProperties(properties.map(p => p.id === currentProperty.id ? { ...p, ...formData } : p));
        } else {
            // ADD LOGIC
            const newProperty = {
                ...formData,
                id: properties.length + 1000, // Mock ID
                owner_name: "Admin Tester",
                status: 'Available',
                created_at: new Date().toISOString().substring(0, 19).replace('T', ' ')
            };
            setMessage({ type: 'success', text: `Successfully added new property: ${newProperty.title}. (Mock add)` });
            // Add to local state (Mock)
            setProperties([...properties, newProperty]);
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        if (!window.confirm("Are you sure you want to archive this property?")) return;
        // ... (rest of the delete logic from Step 9 remains the same) ...
        try {
            const response = await api.deleteProperty(propertyId);
            if (response.success) {
                setMessage({ type: 'success', text: response.message });
                setProperties(properties.map(p => 
                    p.id === propertyId ? { ...p, status: 'Archived' } : p
                ));
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred during archiving.' });
        }
    };


    return (
        <Container fluid className="p-0">
            <h2 className="mb-4 fw-bold">🏘️ Manage Properties</h2>
            
            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary-custom" onClick={handleShowAdd}>
                    <i className="fas fa-plus me-2"></i> Add New Property
                </Button>
            </div>

            {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.text}</Alert>}

            <Card className="card-custom">
                <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
                    All Listings ({properties.filter(p => p.status === 'Available' || p.status === 'Rented').length})
                </Card.Header>
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2 text-muted">Loading properties list...</p>
                        </div>
                    ) : (
                        <PropertyTable 
                            properties={properties} 
                            onDelete={handleDeleteProperty} 
                            onEdit={handleShowEdit} // <--- LINKED TO MODAL
                        />
                    )}
                </Card.Body>
            </Card>

            {/* Property Add/Edit Modal */}
            <PropertyFormModal 
                show={showModal}
                handleClose={handleCloseModal}
                property={currentProperty}
                onSubmit={handleFormSubmit}
            />
        </Container>
    );
};

export default ManageProperties;



