// Register.jsx

import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../components/common/UserNavbar'; 

const ACCENT_COLOR = '#D4AF37';
const BACKGROUND_DARK_COLOR = '#050508';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

const Register = () => {
    // --- State for Registration Fields ---
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
    }

    try {
        const response = await register(email, password, { 
            full_name: `${firstName} ${lastName}`,
            phone_number: phoneNumber,
            role: 'user'
        }); 
        
        if (response.success) {
  const redirectPath = response.user.role === 'admin' ? '/admin/dashboard' : '/UserProfile';
  navigate(redirectPath, { replace: true });
} else {
            setError(response.message || 'Registration failed. Please try again.');
        }
    } catch (err) {
        console.error("Registration Error:", err);
        setError('An unexpected error occurred during registration.');
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: BACKGROUND_DARK_COLOR }}>
            <UserNavbar primaryColor={ACCENT_COLOR} lightBg={false} />
            <style jsx="true">{`
                .register-container {
                    min-height: calc(100vh - 80px);
                    background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.15), #050508);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .register-card {
                    background: ${CARD_DARK};
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
                    border-radius: 20px;
                    border: 1px solid rgba(212, 175, 55, 0.4);
                    color: ${TEXT_LIGHT};
                }
                .register-icon-wrap {
                    width: 52px;
                    height: 52px;
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    background: radial-gradient(circle, ${ACCENT_COLOR}, transparent 60%);
                    color: #050508;
                }
                .register-title {
                    color: ${TEXT_LIGHT};
                }
                .register-subtitle {
                    color: #c2c2c2;
                }
                .register-label {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #b4b4b4;
                    margin-bottom: 0.3rem;
                }
                .register-input {
                    background: #0f1017;
                    border: 1px solid #2a2a35;
                    border-radius: 10px;
                    padding: 0.7rem 1rem;
                    color: ${TEXT_LIGHT};
                    font-size: 0.9rem;
                }
                .register-input::placeholder {
                    color: #8f8f9c;
                }
                .register-input:focus {
                    outline: none;
                    border-color: ${ACCENT_COLOR};
                    box-shadow: 0 0 0 1px ${ACCENT_COLOR};
                }
                .btn-primary-custom {
                    background-color: ${ACCENT_COLOR};
                    border-color: ${ACCENT_COLOR};
                    transition: all 0.3s ease;
                    color: #050508;
                    border-radius: 10px;
                    font-weight: 600;
                }
                .btn-primary-custom:hover {
                    background-color: #c59a24;
                    border-color: #c59a24;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(212, 175, 55, 0.5);
                    color: #050508;
                }
                .btn-primary-custom:focus {
                    box-shadow: 0 0 0 0.25rem rgba(212, 175, 55, 0.35);
                }
                .register-footer-border {
                    border-top: 1px solid #2a2a35;
                }
                .register-footer-text {
                    color: #b4b4b4;
                }
                .register-footer-link {
                    color: ${ACCENT_COLOR};
                    font-weight: bold;
                    text-decoration: none;
                }
                .register-footer-link:hover {
                    text-decoration: underline;
                }
            `}</style>

            <Container 
                fluid 
                className="register-container p-4"
            > 
                <Card className="register-card" style={{ maxWidth: '600px', width: '100%' }}> 
                    <Card.Body className="p-5">
                        <div className="text-center mb-4">
                            <div className="register-icon-wrap mb-3">
                                <i className="fas fa-user-plus fa-lg"></i>
                            </div>
                            <h3 className="fw-bold mt-2 mb-1 register-title">
                                Create Account
                            </h3>
                            <p className="register-subtitle mb-0">
                                Join GoHome today to find your next premium stay.
                            </p>
                        </div>
                        
                        {error && <Alert variant="danger" className="text-center py-2">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group>
                                        <div className="register-label">First Name</div>
                                        <Form.Control 
                                            type="text" 
                                            value={firstName} 
                                            onChange={(e) => setFirstName(e.target.value)} 
                                            required 
                                            placeholder="Enter first name"
                                            className="register-input"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <div className="register-label">Last Name</div>
                                        <Form.Control 
                                            type="text" 
                                            value={lastName} 
                                            onChange={(e) => setLastName(e.target.value)} 
                                            required 
                                            placeholder="Enter last name"
                                            className="register-input"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            <Form.Group className="mb-3">
                                <div className="register-label">Phone Number</div>
                                <Form.Control 
                                    type="tel" 
                                    value={phoneNumber} 
                                    onChange={(e) => setPhoneNumber(e.target.value)} 
                                    required 
                                    placeholder="e.g., 9876543210"
                                    className="register-input"
                                />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <div className="register-label">Email ID</div>
                                <Form.Control 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    placeholder="Enter your email"
                                    className="register-input"
                                />
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <div className="register-label">Password</div>
                                <Form.Control 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    placeholder="Choose a strong password"
                                    minLength={6}
                                    className="register-input"
                                />
                            </Form.Group>

                            <Button 
                                variant="primary-custom" 
                                type="submit" 
                                className="w-100 fw-bold py-2" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin me-2"></i> Registering...
                                    </>
                                ) : (
                                    'Register Now'
                                )}
                            </Button>
                        </Form>

                        <div className="text-center mt-4 pt-3 register-footer-border">
                            <p className="mb-1 register-footer-text">
                                Already have an account?
                            </p>
                            <Link to="/login" className="register-footer-link">
                                Log In Here
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
