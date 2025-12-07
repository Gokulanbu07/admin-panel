// src/pages/admin/MyProperties.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner, Button } from 'react-bootstrap';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PropertyTable from '../../components/admin/PropertyTable'; 
import PropertyFormModal from '../../components/admin/PropertyFormModal';

const MyProperties = () => {
    // We use the 'user' object from AuthContext to get the owner's ID
    const { user } = useAuth(); 
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    
    // Modal State for Add/Edit
    const [showModal, setShowModal] = useState(false);
    const [currentProperty, setCurrentProperty] = useState(null); 

    // --- Data Fetching Logic ---
    const fetchMyPropertiesData = async () => {
        setLoading(true);
        try {
            const response = await api.fetchProperties(); 
            
           
            const mockOwnerId = 1;
            const myProperties = response.properties.filter(p => p.owner_id === mockOwnerId);

            if (response.success) {
                setProperties(myProperties);
            }
        } catch (error) {
            setMessage({ type: 'danger', text: 'Error fetching your property listings.' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPropertiesData();
    }, []);

    // --- Modal Handlers ---
    const handleShowAdd = () => {
        setCurrentProperty(null);
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
        
        fetchMyPropertiesData();
    };

    // --- Form Submission Handler (Mock CRUD) ---
    const handleFormSubmit = (formData) => {
        setMessage(null);
        if (currentProperty) {
            // Mock EDIT LOGIC
            setMessage({ type: 'success', text: `Successfully updated property: ${formData.title}. (Mock update)` });
            setProperties(properties.map(p => p.id === currentProperty.id ? { ...p, ...formData } : p));
        } else {
            // Mock ADD LOGIC
            const newProperty = {
                ...formData,
                id: Math.floor(Math.random() * 10000), // Unique mock ID
                owner_id: user?.id || 1, 
                owner_name: user?.full_name || 'Admin',
                status: 'Available',
                created_at: new Date().toISOString().substring(0, 19).replace('T', ' ')
            };
            setMessage({ type: 'success', text: `Successfully added new property: ${newProperty.title}. (Mock add)` });
            setProperties([...properties, newProperty]);
        }
        setShowModal(false); // Close the modal on submit
    };

    // --- Delete Handler (Mock) ---
    const handleDeleteProperty = async (propertyId) => {
        if (!window.confirm("Are you sure you want to archive this property?")) return;
        try {
            
            setMessage({ type: 'success', text: "Property archived successfully. (Mock delete)" });
            setProperties(properties.filter(p => p.id !== propertyId)); // Remove from list
        } catch (error) {
            setMessage({ type: 'danger', text: 'An error occurred during archiving.' });
        }
    };

    return (
        <Container fluid className="p-0">
            <h2 className="mb-4 fw-bold">My Listings</h2>
            
            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" onClick={handleShowAdd}>
                     Add New Listing
                </Button>
            </div>

            {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>{message.text}</Alert>}

            <Card className="card-custom">
                <Card.Header className="card-header-custom">
                    Your Active Listings
                </Card.Header>
                <Card.Body>
                    {loading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2 text-muted">Loading your listings...</p>
                        </div>
                    ) : (
                        <PropertyTable 
                            properties={properties} 
                            onDelete={handleDeleteProperty} 
                            onEdit={handleShowEdit}
                            // Only show actions for the owner's properties
                            showActions={true} 
                        />
                    )}
                    {!loading && properties.length === 0 && (
                         <Alert variant="info" className="text-center my-3">You currently have no properties listed.</Alert>
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

export default MyProperties;