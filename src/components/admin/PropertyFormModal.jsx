// src/components/admin/PropertyFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

const initialFormState = {
    owner_id: 1, // Default owner ID for admin testing
    title: '',
    address_line: '',
    city: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    sq_ft: 0,
    furnishing_status: 'Unfurnished',
    description: '',
    main_image: '',
    property_type: 'Apartment',
    // Amenities
    has_pool: 0,
    has_gym: 0,
    has_parking: 0,
    has_security: 0,
    amenities_other: '',
};

const PropertyFormModal = ({ show, handleClose, property, onSubmit }) => {
    const [formData, setFormData] = useState(initialFormState);
    const isEdit = !!property;

    useEffect(() => {
        // If property data is passed (i.e., we are editing), load it into the form
        if (isEdit && property) {
            setFormData({
                ...initialFormState, // Ensure all fields exist
                ...property,
                // Ensure checkable fields are correctly parsed from DB (0/1)
                has_pool: property.has_pool === 1,
                has_gym: property.has_gym === 1,
                has_parking: property.has_parking === 1,
                has_security: property.has_security === 1,
            });
        } else {
            setFormData(initialFormState);
        }
    }, [property, show, isEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert boolean amenities back to 0/1 for API payload
        const payload = {
            ...formData,
            has_pool: formData.has_pool ? 1 : 0,
            has_gym: formData.has_gym ? 1 : 0,
            has_parking: formData.has_parking ? 1 : 0,
            has_security: formData.has_security ? 1 : 0,
        };

        // Submit the data (handleAddProperty or handleUpdateProperty in parent)
        onSubmit(payload);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static" centered>
            <Modal.Header closeButton className="card-header-custom">
                <Modal.Title className="fw-bold">{isEdit ? `Edit Property: ${property?.title}` : 'Add New Property'}</Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className="g-3">
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Title</Form.Label>
                                <Form.Control name="title" value={formData.title} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        
                        {/* --- Location --- */}
                        <Col md={8}>
                            <Form.Group>
                                <Form.Label>Address Line</Form.Label>
                                <Form.Control name="address_line" value={formData.address_line} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control name="city" value={formData.city} onChange={handleChange} required />
                            </Form.Group>
                        </Col>

                        {/* --- Details --- */}
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Price (INR/Mo)</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>₹</InputGroup.Text>
                                    <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
                                </InputGroup>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Bedrooms</Form.Label>
                                <Form.Control type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required min="0" />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Bathrooms</Form.Label>
                                <Form.Control type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required min="0" />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Sq. Ft.</Form.Label>
                                <Form.Control type="number" name="sq_ft" value={formData.sq_ft} onChange={handleChange} required min="0" />
                            </Form.Group>
                        </Col>

                        {/* --- Status & Type --- */}
                         <Col md={6}>
                            <Form.Group>
                                <Form.Label>Property Type</Form.Label>
                                <Form.Select name="property_type" value={formData.property_type} onChange={handleChange}>
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>Office</option>
                                    <option>Land</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Furnishing Status</Form.Label>
                                <Form.Select name="furnishing_status" value={formData.furnishing_status} onChange={handleChange}>
                                    <option>Unfurnished</option>
                                    <option>Semi-Furnished</option>
                                    <option>Fully-Furnished</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* --- Description & Image --- */}
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                             <Form.Group>
                                <Form.Label>Main Image URL (or Upload)</Form.Label>
                                <Form.Control type="text" name="main_image" value={formData.main_image} onChange={handleChange} placeholder="https://placehold.co/600x400" />
                            </Form.Group>
                        </Col>

                        {/* --- Amenities (Checkboxes) --- */}
                        <Col md={12} className="mt-3">
                            <h5 className="fw-bold mb-3">Amenities</h5>
                            <Row>
                                <Col sm={3}>
                                    <Form.Check type="checkbox" label="Pool" name="has_pool" checked={formData.has_pool} onChange={handleChange} />
                                </Col>
                                <Col sm={3}>
                                    <Form.Check type="checkbox" label="Gym" name="has_gym" checked={formData.has_gym} onChange={handleChange} />
                                </Col>
                                <Col sm={3}>
                                    <Form.Check type="checkbox" label="Parking" name="has_parking" checked={formData.has_parking} onChange={handleChange} />
                                </Col>
                                <Col sm={3}>
                                    <Form.Check type="checkbox" label="Security" name="has_security" checked={formData.has_security} onChange={handleChange} />
                                </Col>
                                <Col sm={12} className="mt-3">
                                    <Form.Group>
                                        <Form.Label>Other Amenities</Form.Label>
                                        <Form.Control type="text" name="amenities_other" value={formData.amenities_other} onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        {isEdit ? 'Save Changes' : 'Add Property'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default PropertyFormModal;