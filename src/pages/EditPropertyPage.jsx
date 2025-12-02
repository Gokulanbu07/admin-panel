import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, Spinner, Nav } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// --- CONFIGURATION ---
const API_BASE_URL = '/api';
const ACCENT_COLOR = '#8e79f6'; 
const PRIMARY_DARK_COLOR = '#1a1a36';
const LIGHT_BACKGROUND = '#f0f4f8'; 

const EditPropertyPage = () => {
    const { id } = useParams(); // Get property ID from URL
    const { isAuthenticated, user, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        property_id: id,
        title: '',
        description: '',
        price: '',
        status: 'Pending', // Add status field for editing
        propertyType: 'Apartment',
        city: '',
        address: '',
        bedrooms: 1,
        bathrooms: 1,
        area: '',
        amenities: [],
        existing_images: [], // To display existing image URLs
        new_images: null, // For new file uploads
    });
    
    const [loading, setLoading] = useState(true); // Start as loading to fetch data
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // --- 1. Security and Data Fetch on Mount ---
    useEffect(() => {
        if (!authLoading && (!isAuthenticated || (user.role !== 'houseowner' && user.role !== 'admin'))) {
            navigate('/login', { replace: true });
            return;
        }

        if (isAuthenticated) {
            fetchPropertyData();
        }
    }, [isAuthenticated, authLoading, navigate, id, user]);

    const fetchPropertyData = async () => {
        setLoading(true);
        setError('');
        try {
            // API endpoint to fetch a single property's details
            const response = await axios.get(`${API_BASE_URL}/get_property_details.php?id=${id}`); 
            
            if (response.data.success && response.data.property) {
                const data = response.data.property;
                
                // Ensure amenities is an array (assuming DB stores it as JSON string or comma-separated)
                const amenitiesArray = Array.isArray(data.amenities) 
                    ? data.amenities 
                    : (typeof data.amenities === 'string' && data.amenities)
                        ? data.amenities.split(',') : [];

                setFormData({
                    property_id: id,
                    title: data.title || '',
                    description: data.description || '',
                    price: data.price || '',
                    status: data.status || 'Pending',
                    propertyType: data.propertyType || 'Apartment',
                    city: data.city || '',
                    address: data.address || '',
                    bedrooms: data.bedrooms || 1,
                    bathrooms: data.bathrooms || 1,
                    area: data.area || '',
                    amenities: amenitiesArray,
                    existing_images: data.images || [], // Load existing image URLs
                    new_images: null,
                });
            } else {
                setError(response.data.message || 'Property not found or access denied.');
            }
        } catch (err) {
            console.error("Fetch Property Error:", err);
            setError('Could not connect to the server to fetch property details.');
        } finally {
            setLoading(false);
        }
    };

    // --- 2. Handlers ---
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                amenities: checked 
                    ? [...prev.amenities, value]
                    : prev.amenities.filter(a => a !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, new_images: e.target.files }));
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        setError('');
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        const data = new FormData();
        // Append property_id
        data.append('property_id', formData.property_id); 
        
        // Append all fields
        Object.keys(formData).forEach(key => {
            if (key !== 'new_images' && key !== 'existing_images' && key !== 'amenities' && key !== 'property_id') {
                data.append(key, formData[key]);
            }
        });

        // Append arrays/files
        data.append('amenities', JSON.stringify(formData.amenities));
        
        if (formData.new_images) {
            for (let i = 0; i < formData.new_images.length; i++) {
                data.append('new_images[]', formData.new_images[i]); // New array notation
            }
        }
        
        try {
            // API endpoint for property update
            const response = await axios.post(`${API_BASE_URL}/update_property.php`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.data.success) {
                setSuccessMessage('Property successfully updated!');
                // Refetch data to show immediate changes
                fetchPropertyData(); 
                setTimeout(() => navigate('/my-properties'), 2000);
            } else {
                setError(response.data.message || 'Failed to update property. Please check inputs.');
            }
        } catch (err) {
            console.error("Update Property Error:", err);
            setError('A network error occurred. Could not submit changes.');
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER FUNCTIONS (Same as AddPropertyPage but adapted) ---
    const StepIndicator = () => (
        <Nav variant="pills" className="justify-content-center mb-4 border-bottom pb-3">
            {[1, 2, 3].map((s) => (
                <Nav.Item key={s}>
                    <Nav.Link 
                        active={step === s} 
                        style={{ 
                            backgroundColor: step === s ? ACCENT_COLOR : LIGHT_BACKGROUND,
                            color: step === s ? 'white' : PRIMARY_DARK_COLOR,
                            borderColor: ACCENT_COLOR,
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            margin: '0 10px'
                        }}
                        onClick={() => setStep(s)}
                    >
                        Step {s}: {s === 1 ? 'Details' : s === 2 ? 'Features' : 'Photos'}
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );

    const Step1Details = () => (
        <>
            <h4 className="mb-4 text-center" style={{ color: PRIMARY_DARK_COLOR }}>Basic Details</h4>
            <Form.Group className="mb-3">
                <Form.Label><i className="fas fa-heading me-2"></i> Property Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g., Spacious 2-bed apartment near City Park" />
            </Form.Group>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-dollar-sign me-2"></i> Price/Rent ($)</Form.Label>
                        <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} required min="1" placeholder="e.g., 250000" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-building me-2"></i> Property Type</Form.Label>
                        <Form.Select name="propertyType" value={formData.propertyType} onChange={handleInputChange} required>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Condo">Condo</option>
                            <option value="Studio">Studio</option>
                            <option value="Villa">Villa</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-tag me-2"></i> Status</Form.Label>
                        <Form.Select name="status" value={formData.status} onChange={handleInputChange} required>
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Draft">Draft</option>
                            <option value="Rented">Rented/Sold</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label><i className="fas fa-align-left me-2"></i> Description</Form.Label>
                <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleInputChange} required placeholder="Provide a detailed description of the property, neighborhood, and features." />
            </Form.Group>
        </>
    );

    const Step2Features = () => (
        <>
            <h4 className="mb-4 text-center" style={{ color: PRIMARY_DARK_COLOR }}>Location & Key Features</h4>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-city me-2"></i> City</Form.Label>
                        <Form.Control type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="e.g., San Francisco" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-map-marked-alt me-2"></i> Full Address</Form.Label>
                        <Form.Control type="text" name="address" value={formData.address} onChange={handleInputChange} required placeholder="Street address, unit number" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-bed me-2"></i> Bedrooms</Form.Label>
                        <Form.Control type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} required min="0" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-bath me-2"></i> Bathrooms</Form.Label>
                        <Form.Control type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} required min="0" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label><i className="fas fa-ruler-combined me-2"></i> Area (sq ft)</Form.Label>
                        <Form.Control type="number" name="area" value={formData.area} onChange={handleInputChange} required min="10" placeholder="e.g., 1200" />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label className="d-block"><i className="fas fa-list-ul me-2"></i> Amenities</Form.Label>
                <Row>
                    {['Parking', 'Pool', 'Gym', 'Laundry', 'Balcony', 'Pet Friendly'].map(amenity => (
                        <Col xs={6} sm={4} key={amenity}>
                            <Form.Check 
                                type="checkbox"
                                id={`amenity-${amenity}`}
                                label={amenity}
                                value={amenity}
                                onChange={handleInputChange}
                                checked={formData.amenities.includes(amenity)}
                                name="amenities"
                            />
                        </Col>
                    ))}
                </Row>
            </Form.Group>
        </>
    );

    const Step3Photos = () => (
        <>
            <h4 className="mb-4 text-center" style={{ color: PRIMARY_DARK_COLOR }}>Property Photos</h4>
            
            {/* Display Existing Images */}
            {formData.existing_images.length > 0 && (
                <div className="mb-4 p-3 border rounded" style={{ borderColor: ACCENT_COLOR }}>
                    <p className="fw-bold mb-2">Existing Images:</p>
                    <div className="d-flex flex-wrap gap-2">
                        {formData.existing_images.map((imgUrl, index) => (
                            <img 
                                key={index} 
                                src={imgUrl} 
                                alt={`Existing ${index}`} 
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }} 
                            />
                        ))}
                    </div>
                    <Form.Text className="text-muted mt-2 d-block">
                        *Note: Image deletion must be handled via a separate mechanism on the backend, not included here.
                    </Form.Text>
                </div>
            )}

            <Form.Group className="mb-3">
                <Form.Label>
                    <i className="fas fa-camera me-2"></i> Upload New Images 
                    <span className="text-muted ms-2">(These will be added to the existing set)</span>
                </Form.Label>
                <Form.Control 
                    type="file" 
                    name="new_images" 
                    onChange={handleFileChange} 
                    multiple 
                    accept="image/jpeg, image/png" 
                />
            </Form.Group>
        </>
    );

    if (authLoading || loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" style={{ color: ACCENT_COLOR }} role="status" />
                <p className="ms-3 h5" style={{ color: PRIMARY_DARK_COLOR }}>{loading ? 'Fetching Property Data...' : 'Authenticating...'}</p>
            </Container>
        );
    }
    
    // Final check for unauthorized users after loading
    if (!user || (user.role !== 'houseowner' && user.role !== 'admin')) return null;

    return (
        <Container style={{ paddingTop: '50px', paddingBottom: '50px', backgroundColor: LIGHT_BACKGROUND }} fluid>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg border-0" style={{ borderRadius: '15px', borderTop: `5px solid ${ACCENT_COLOR}` }}>
                        <Card.Body className="p-4 p-md-5">
                            <h2 className="text-center fw-bold mb-4" style={{ color: PRIMARY_DARK_COLOR }}>
                                <i className="fas fa-pen-to-square me-2" style={{ color: ACCENT_COLOR }}></i> 
                                Edit Property Listing (ID: {id})
                            </h2>
                            
                            <StepIndicator />

                            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                            {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                {step === 1 && <Step1Details />}
                                {step === 2 && <Step2Features />}
                                {step === 3 && <Step3Photos />}
                                
                                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                                    <Button 
                                        variant="outline-secondary" 
                                        onClick={prevStep} 
                                        disabled={step === 1 || loading}
                                    >
                                        <i className="fas fa-arrow-left me-2"></i> Previous
                                    </Button>
                                    
                                    {step < 3 ? (
                                        <Button 
                                            onClick={nextStep} 
                                            style={{ backgroundColor: ACCENT_COLOR, borderColor: ACCENT_COLOR }}
                                            className="fw-bold"
                                            disabled={loading}
                                        >
                                            Next Step <i className="fas fa-arrow-right ms-2"></i>
                                        </Button>
                                    ) : (
                                        <Button 
                                            type="submit" 
                                            style={{ backgroundColor: PRIMARY_DARK_COLOR, borderColor: PRIMARY_DARK_COLOR }}
                                            className="fw-bold"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                                    Saving Changes...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save me-2"></i> Update Listing
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditPropertyPage;
