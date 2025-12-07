// src/components/admin/PropertyFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

// ---- THEME COLORS (same palette as admin panel) ----
const BACKGROUND_DARK = '#050508';
const PANEL_DARK = '#0b0b10';
const GOLD = '#D4AF37';
const TEXT_LIGHT = '#F5F5F5';
const BORDER_SOFT = 'rgba(212, 175, 55, 0.35)';

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
  // Amenities (booleans in UI)
  has_pool: false,
  has_gym: false,
  has_parking: false,
  has_security: false,
  amenities_other: '',
};

const PropertyFormModal = ({ show, handleClose, property, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState('');
  const isEdit = !!property;

  useEffect(() => {
    if (isEdit && property) {
      setFormData({
        ...initialFormState,
        ...property,
        has_pool: !!property.has_pool,
        has_gym: !!property.has_gym,
        has_parking: !!property.has_parking,
        has_security: !!property.has_security,
      });
      setImagePreview(property.main_image || '');
    } else {
      setFormData(initialFormState);
      setImagePreview('');
    }
  }, [property, show, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    // For now we just store the preview URL as main_image (front-end only demo)
    setFormData((prev) => ({
      ...prev,
      main_image: previewUrl,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      has_pool: formData.has_pool ? 1 : 0,
      has_gym: formData.has_gym ? 1 : 0,
      has_parking: formData.has_parking ? 1 : 0,
      has_security: formData.has_security ? 1 : 0,
    };

    onSubmit(payload);
    handleClose();
  };

  return (
    <>
      {/* LOCAL STYLES FOR DARK MODAL */}
     <style jsx="true">{`
  /* Shimmer animation */
  @keyframes goldShimmer {
    0% {
      background-position: 0% 50%;
      opacity: 0.7;
    }
    50% {
      background-position: 100% 50%;
      opacity: 1;
    }
    100% {
      background-position: 0% 50%;
      opacity: 0.7;
    }
  }

  /* Backdrop blur */
  .modal-backdrop.show {
    opacity: 0.5 !important;
    backdrop-filter: blur(10px) saturate(160%) contrast(115%);
    background: rgba(0,0,0,0.65);
  }

  /* Glass container */
  .admin-modal-dark .modal-content {
    position: relative;
    overflow: hidden;
    background: radial-gradient(circle at top left, rgba(212,175,55,0.10), rgba(5,5,8,0.92));
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);
    border-radius: 22px;
    border: 1px solid rgba(212,175,55,0.45);
    box-shadow: 0 24px 70px rgba(0,0,0,0.9);
  }

  /* Animated gold border shimmer */
  .admin-modal-dark .modal-content::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    pointer-events: none;
    background: linear-gradient(
      120deg,
      rgba(212,175,55,0.0),
      rgba(251,224,122,0.9),
      rgba(212,175,55,0.0)
    );
    background-size: 220% 220%;
    animation: goldShimmer 6s linear infinite;
    mix-blend-mode: screen;
  }

  /* Inner soft vignette so fields are readable */
  .admin-modal-dark .modal-content::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 21px;
    pointer-events: none;
    background: radial-gradient(circle at top, rgba(255,255,255,0.02), transparent 60%),
                radial-gradient(circle at bottom, rgba(0,0,0,0.65), transparent 55%);
  }

  /* Header + footer */
  .admin-modal-dark .modal-header,
  .admin-modal-dark .modal-footer {
    background: rgba(5,5,8,0.95);
    border-color: rgba(212,175,55,0.25);
    color: #f8f5e9;
  }

  .admin-modal-dark .modal-title {
    color: #f7e29d;
    letter-spacing: 0.05em;
  }

  /* Body background slightly lighter than full black */
  .admin-modal-dark .modal-body {
    background: rgba(8,8,12,0.92);
    color: #f5f5f5;
  }

  /* Inputs */
  .admin-modal-dark .form-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #cfc7a5;
  }

  .admin-modal-dark .form-control,
  .admin-modal-dark .form-select {
    background: rgba(10,10,16,0.9);
    border: 1px solid rgba(212,175,55,0.35);
    color: #ffffff;
  }

  .admin-modal-dark .form-control::placeholder {
    color: rgba(255,255,255,0.4);
  }

  .admin-modal-dark .form-control:focus,
  .admin-modal-dark .form-select:focus {
    border-color: #fbe07a;
    box-shadow: 0 0 0 1px rgba(251,224,122,0.7);
  }

  /* Amenities checkboxes */
  .admin-modal-dark .form-check-label {
    color: #e4ddc4;
  }

  /* Image preview box */
  .admin-modal-dark .image-preview-wrapper {
    background: rgba(0,0,0,0.75);
    border-radius: 14px;
    border: 1px dashed rgba(212,175,55,0.4);
    color: #c2c2c2;
  }

  /* Buttons */
  .admin-modal-dark .btn-gold-primary,
  .admin-modal-dark .btn-primary {
    background: linear-gradient(135deg, #fbe07a, #d4af37);
    border-color: #d4af37;
    color: #050508;
    font-weight: 600;
    box-shadow: 0 0 18px rgba(212,175,55,0.6);
  }

  .admin-modal-dark .btn-gold-primary:hover,
  .admin-modal-dark .btn-primary:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }

  .admin-modal-dark .btn-outline-secondary,
  .admin-modal-dark .btn-secondary {
    background: transparent;
    border-color: rgba(255,255,255,0.25);
    color: #f5f5f5;
  }
`}</style>



      <Modal
  show={show}
  onHide={handleClose}
  size="lg"
  backdrop="static"
  centered
  className="admin-modal-dark"
>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? `Edit Property: ${property?.title}` : 'Add New Property'}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-3">
              {/* Title */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Luxury 2BHK in Velachery"
                  />
                </Form.Group>
              </Col>

              {/* Address + City */}
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Address Line</Form.Label>
                  <Form.Control
                    name="address_line"
                    value={formData.address_line}
                    onChange={handleChange}
                    required
                    placeholder="Door no, street, landmark..."
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Chennai, Bangalore, etc."
                  />
                </Form.Group>
              </Col>

              {/* Price / Beds / Baths / Sq.ft */}
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Price (INR / Month)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Bedrooms</Form.Label>
                  <Form.Control
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Bathrooms</Form.Label>
                  <Form.Control
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Sq. Ft.</Form.Label>
                  <Form.Control
                    type="number"
                    name="sq_ft"
                    value={formData.sq_ft}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </Form.Group>
              </Col>

              {/* Type + Furnishing */}
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Property Type</Form.Label>
                  <Form.Select
                    name="property_type"
                    value={formData.property_type}
                    onChange={handleChange}
                  >
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
                  <Form.Select
                    name="furnishing_status"
                    value={formData.furnishing_status}
                    onChange={handleChange}
                  >
                    <option>Unfurnished</option>
                    <option>Semi-Furnished</option>
                    <option>Fully-Furnished</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Description */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short description of the property, surroundings, highlights..."
                  />
                </Form.Group>
              </Col>

              {/* Image URL + Upload + Preview */}
              <Col md={8}>
                <Form.Group className="mb-2">
                  <Form.Label>Main Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="main_image"
                    value={formData.main_image}
                    onChange={(e) => {
                      handleChange(e);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Or Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                  />
                  <Form.Text className="text-muted">
                    For now this is front-end only (no real upload).
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={4}>
                <div className="image-preview-wrapper">
                  <small className="text-muted d-block mb-2">
                    Preview
                  </small>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <div
                      style={{
                        height: 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#777',
                        fontSize: '0.85rem',
                      }}
                    >
                      No image selected
                    </div>
                  )}
                </div>
              </Col>

              {/* Amenities */}
              <Col md={12} className="mt-2">
                <div className="amenities-box">
                  <h6 className="mb-3" style={{ color: GOLD }}>
                    Amenities
                  </h6>
                  <Row>
                    <Col sm={3}>
                      <Form.Check
                        type="checkbox"
                        label="Pool"
                        name="has_pool"
                        checked={formData.has_pool}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={3}>
                      <Form.Check
                        type="checkbox"
                        label="Gym"
                        name="has_gym"
                        checked={formData.has_gym}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={3}>
                      <Form.Check
                        type="checkbox"
                        label="Parking"
                        name="has_parking"
                        checked={formData.has_parking}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={3}>
                      <Form.Check
                        type="checkbox"
                        label="Security"
                        name="has_security"
                        checked={formData.has_security}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col sm={12} className="mt-3">
                      <Form.Group>
                        <Form.Label>Other Amenities</Form.Label>
                        <Form.Control
                          type="text"
                          name="amenities_other"
                          value={formData.amenities_other}
                          onChange={handleChange}
                          placeholder="e.g., Power backup, Wi-Fi, Lift..."
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              onClick={handleClose}
              className="btn-outline-soft"
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-gold-primary">
              {isEdit ? 'Save Changes' : 'Add Property'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default PropertyFormModal;
