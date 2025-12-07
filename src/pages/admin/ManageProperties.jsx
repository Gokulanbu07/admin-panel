// src/pages/admin/MyProperties.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Spinner, Button } from 'react-bootstrap';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PropertyTable from '../../components/admin/PropertyTable';
import PropertyFormModal from '../../components/admin/PropertyFormModal';

const MyProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const GOLD = '#D4AF37';

  const fetchMyPropertiesData = async () => {
    setLoading(true);
    try {
      const response = await api.fetchProperties();

      const mockOwnerId = 1;
      const myProperties = (response.properties || []).filter(
        (p) => p.owner_id === mockOwnerId
      );

      if (response.success) {
        setProperties(myProperties);
      }
    } catch {
      setMessage({
        type: 'danger',
        text: 'Error fetching your property listings.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPropertiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----- Modal Handlers -----
  const handleShowAdd = () => {
    setCurrentProperty(null);
    setShowModal(true);
  };

  const handleShowEdit = (propertyId) => {
    const propertyToEdit = properties.find((p) => p.id === propertyId);
    setCurrentProperty(propertyToEdit);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentProperty(null);
    fetchMyPropertiesData();
  };

  // ----- Form Submit (Mock) -----
  const handleFormSubmit = (formData) => {
    setMessage(null);

    if (currentProperty) {
      setMessage({
        type: 'success',
        text: `Updated listing (mock): ${formData.title}`,
      });

      setProperties((prev) =>
        prev.map((p) =>
          p.id === currentProperty.id ? { ...p, ...formData } : p
        )
      );
    } else {
      const newProperty = {
        ...formData,
        id: Math.floor(Math.random() * 10000),
        owner_id: user?.id || 1,
        owner_name: user?.full_name || 'Admin',
        status: 'Available',
        created_at: new Date().toISOString().substring(0, 19).replace('T', ' '),
      };

      setMessage({
        type: 'success',
        text: `New listing added (mock): ${newProperty.title}`,
      });

      setProperties((prev) => [...prev, newProperty]);
    }

    setShowModal(false);
  };

  // ----- Delete (Mock) -----
  const handleDeleteProperty = async (propertyId) => {
    if (!window.confirm('Are you sure you want to archive this property?'))
      return;

    try {
      setMessage({
        type: 'success',
        text: 'Property archived successfully. (Mock delete)',
      });
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } catch {
      setMessage({
        type: 'danger',
        text: 'An error occurred during archiving.',
      });
    }
  };

  return (
    <Container fluid className="p-0">
      {/* Page Title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: GOLD }}>
            My Listings
          </h2>
          <p className=" mb-0">
            Manage only the properties owned by you / your account.
          </p>
        </div>

        <Button
          onClick={handleShowAdd}
          style={{
            backgroundColor: GOLD,
            border: 'none',
            color: '#111',
            fontWeight: '600',
            borderRadius: '30px',
          }}
        >
          <i className="fas fa-plus me-2" />
          Add New Listing
        </Button>
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
          <span>Your Active Listings</span>
          <span style={{ fontSize: '.8rem', color: '#aaa' }}>
            Count: {properties.length}
          </span>
        </Card.Header>

        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
              <p className="mt-2 text-muted">Loading your listings...</p>
            </div>
          ) : properties.length > 0 ? (
            <PropertyTable
              properties={properties}
              onDelete={handleDeleteProperty}
              onEdit={handleShowEdit}
            />
          ) : (
            <Alert variant="info" className="text-center my-3">
              You currently have no properties listed.
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
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
