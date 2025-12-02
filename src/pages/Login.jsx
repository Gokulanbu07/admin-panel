// Login.jsx

import React, { useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import UserNavbar from '../components/common/UserNavbar';

const ACCENT_COLOR = '#D4AF37';
const BACKGROUND_DARK_COLOR = '#050508';
const CARD_DARK = '#0b0b10';
const TEXT_LIGHT = '#F5F5F5';

const Login = () => {
    // Multiple states for login fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        try {
            const response = await login(email, password); 
            
            if (response.success) {
const redirectPath = response.user.role === 'admin' 
    ? '/admin/dashboard' 
    : '/user/dashboard';
                navigate(redirectPath, { replace: true });
            } else {
                setError(response.message || 'Login failed. Check your credentials.');
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: BACKGROUND_DARK_COLOR }}>
            {/* Dark navbar with gold logo */}
            <UserNavbar primaryColor={ACCENT_COLOR} lightBg={false} /> 
            
            <div style={{ flexGrow: 1 }}>
                <style jsx="true">{`
                    .login-container {
                        min-height: calc(100vh - 80px);
                        background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.15), #050508);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .login-card {
                        background: ${CARD_DARK};
                        border-radius: 20px;
                        border: 1px solid rgba(212, 175, 55, 0.4);
                        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
                        color: ${TEXT_LIGHT};
                    }
                    .login-icon-wrap {
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
                    .login-title {
                        color: ${TEXT_LIGHT};
                    }
                    .login-subtitle {
                        color: #c2c2c2;
                    }
                    .login-label {
                        font-size: 0.8rem;
                        text-transform: uppercase;
                        letter-spacing: 0.1em;
                        color: #b4b4b4;
                        margin-bottom: 0.3rem;
                    }
                    .login-input {
                        background: #0f1017;
                        border: 1px solid #2a2a35;
                        border-radius: 10px;
                        padding: 0.7rem 1rem;
                        color: ${TEXT_LIGHT};
                        font-size: 0.9rem;
                    }
                    .login-input::placeholder {
                        color: #8f8f9c;
                    }
                    .login-input:focus {
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
                    .login-footer-border {
                        border-top: 1px solid #2a2a35;
                    }
                    .login-footer-text {
                        color: #b4b4b4;
                    }
                    .login-footer-link {
                        color: ${ACCENT_COLOR};
                        font-weight: bold;
                        text-decoration: none;
                    }
                    .login-footer-link:hover {
                        text-decoration: underline;
                    }
                `}</style>

                <Container 
                    fluid 
                    className="login-container p-4"
                >
                    <Card className="login-card" style={{ maxWidth: '450px', width: '100%' }}>
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <div className="login-icon-wrap mb-3">
                                    <i className="fas fa-home fa-lg"></i>
                                </div>
                                <h3 className="fw-bold mt-2 mb-1 login-title">
                                    Welcome Back
                                </h3>
                                <p className="login-subtitle mb-0">
                                    Sign in to your GoHome account to continue.
                                </p>
                            </div>
                            
                            {error && <Alert variant="danger" className="text-center py-2">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <div className="login-label">Email</div>
                                    <Form.Control 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                        placeholder="you@example.com"
                                        className="login-input"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <div className="login-label">Password</div>
                                    <Form.Control 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required 
                                        placeholder="Enter your password"
                                        className="login-input"
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
                                            <i className="fas fa-spinner fa-spin me-2"></i> Logging In...
                                        </>
                                    ) : (
                                        'Log In'
                                    )}
                                </Button>
                            </Form>

                            <div className="text-center mt-4 pt-3 login-footer-border">
                                <p className="mb-1 login-footer-text">
                                    Don&apos;t have an account?
                                </p>
                                <Link to="/register" className="login-footer-link">
                                    Register Here
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default Login;
