import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UpgradeOwnerPage = () => {
  const { user, upgradeToOwner } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Where to go back after success
  const redirectTarget = location.state?.from || '/profile';

  const [activeKey, setActiveKey] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [cardForm, setCardForm] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const [upiForm, setUpiForm] = useState({
    upiId: '',
  });

  // If already houseowner, send away
  useEffect(() => {
    if (user?.role === 'houseowner') {
      navigate(redirectTarget, { replace: true });
    }
  }, [user, navigate, redirectTarget]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpiChange = (e) => {
    const { name, value } = e.target;
    setUpiForm((prev) => ({ ...prev, [name]: value }));
  };

  // --- Validation ---
  const validateCard = () => {
    const newErrors = {};
    const digitsOnly = cardForm.number.replace(/\D/g, '');

    if (!cardForm.name.trim()) newErrors.name = 'Name on card is required.';
    if (digitsOnly.length !== 16)
      newErrors.number = 'Card number must be 16 digits.';
    if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry))
      newErrors.expiry = 'Expiry must be in MM/YY format.';
    if (!/^\d{3}$/.test(cardForm.cvv))
      newErrors.cvv = 'CVV must be 3 digits.';

    return newErrors;
  };

  const validateUpi = () => {
    const newErrors = {};
    if (!upiForm.upiId.trim()) {
      newErrors.upiId = 'UPI ID is required.';
    } else if (!/.+@.+/.test(upiForm.upiId)) {
      newErrors.upiId = 'Enter a valid UPI ID (e.g., name@upi).';
    }
    return newErrors;
  };

  const handlePay = (method) => {
    let validationErrors = {};

    if (method === 'card') {
      validationErrors = validateCard();
    } else {
      validationErrors = validateUpi();
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // Simulate processing
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      // Upgrade role in frontend
      upgradeToOwner();

      // after small delay, go back
      setTimeout(() => {
        navigate(redirectTarget, { replace: true });
      }, 1800);
    }, 1500);
  };

  const GOLD = '#D4AF37';
  const DARK = '#050508';
  const PANEL = '#0b0b10';
  const TEXT = '#F5F5F5';

  return (
    <Container fluid className="py-5">
      <style jsx="true">{`
        .upgrade-shell {
          max-width: 900px;
          margin: 0 auto;
        }

        .upgrade-page-title {
          color: ${GOLD};
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .upgrade-subtext {
          color: #c0c0cf;
          max-width: 580px;
        }

        .upgrade-card {
          background: ${PANEL};
          border-radius: 18px;
          border: 1px solid rgba(212, 175, 55, 0.28);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9);
          color: ${TEXT};
        }

        .upgrade-tabs .nav-link {
          color: #c9c9d5;
        }

        .upgrade-tabs .nav-link.active {
          color: ${DARK};
          background-color: ${GOLD};
          border-radius: 999px;
          border: none;
        }

        .upgrade-label {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #aaaa bb;
        }

        .upgrade-success-icon {
          width: 80px;
          height: 80px;
          border-radius: 999px;
          background: radial-gradient(circle, #00c853, #004d40);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
          margin: 0 auto 1rem;
          box-shadow: 0 0 22px rgba(0, 200, 83, 0.9);
        }
      `}</style>

      <div className="upgrade-shell">
        <Row className="mb-4">
          <Col md={8}>
            <h2 className="upgrade-page-title">Upgrade to House Owner</h2>
            <p className="upgrade-subtext mb-0">
              List your own properties, manage visits and chat with potential
              tenants directly from GoHome. Complete a quick one-time payment to
              unlock owner features.
            </p>
          </Col>
        </Row>

        <Card className="upgrade-card">
          <Card.Body className="p-4">
            {success ? (
              // --- SUCCESS VIEW ---
              <div className="text-center py-4">
                <div className="upgrade-success-icon">
                  <i className="fas fa-check" />
                </div>
                <h4 className="mb-2">Payment Successful</h4>
                <p className="text-muted mb-3">
                  Your account has been upgraded to <strong>House Owner</strong>.
                </p>
                <p className="text-muted mb-1">
                  Redirecting you back to where you left…
                </p>
                <small className="text-muted">
                  If not redirected, you can{' '}
                  <Button
                    variant="link"
                    className="p-0 align-baseline"
                    onClick={() => navigate(redirectTarget, { replace: true })}
                  >
                    click here
                  </Button>
                  .
                </small>
              </div>
            ) : (
              <>
                <Tabs
                  id="upgrade-payment-tabs"
                  activeKey={activeKey}
                  onSelect={(k) => setActiveKey(k || 'card')}
                  className="mb-3 upgrade-tabs"
                >
                  <Tab eventKey="card" title="Pay with Card">
                    <Row className="mt-3">
                      <Col md={8}>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label className="upgrade-label">
                              Name on Card
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={cardForm.name}
                              onChange={handleCardChange}
                              isInvalid={!!errors.name}
                              placeholder="e.g., GOKUL ANBU"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label className="upgrade-label">
                              Card Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="number"
                              value={cardForm.number}
                              onChange={handleCardChange}
                              isInvalid={!!errors.number}
                              placeholder="16-digit card number"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.number}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="upgrade-label">
                                  Expiry (MM/YY)
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="expiry"
                                  value={cardForm.expiry}
                                  onChange={handleCardChange}
                                  isInvalid={!!errors.expiry}
                                  placeholder="07/28"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.expiry}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label className="upgrade-label">
                                  CVV
                                </Form.Label>
                                <Form.Control
                                  type="password"
                                  name="cvv"
                                  value={cardForm.cvv}
                                  onChange={handleCardChange}
                                  isInvalid={!!errors.cvv}
                                  placeholder="3-digit CVV"
                                />
                                <Form.Control.Feedback type="invalid">
                                  {errors.cvv}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>

                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <div className="" style={{ fontSize: '0.85rem' }}>
                              One-time upgrade fee:
                              <span style={{ color: GOLD, marginLeft: 6 }}>
                                ₹999
                              </span>
                            </div>
                            <Button
                              type="button"
                              className="btn-primary-custom px-4"
                              disabled={processing}
                              onClick={() => handlePay('card')}
                            >
                              {processing ? (
                                <>
                                  <i className="fas fa-spinner fa-spin me-2" />
                                  Processing…
                                </>
                              ) : (
                                'Pay Securely'
                              )}
                            </Button>
                          </div>
                        </Form>
                      </Col>

                      <Col md={4} className="mt-4 mt-md-0">
                        <div className="p-3 rounded" style={{ background: '#12121b' }}>
                          <h6 className="mb-2">What you get:</h6>
                          <ul className="mb-0" style={{ paddingLeft: '1.1rem' }}>
                            <li>Post unlimited rental listings</li>
                            <li>Manage visits & slots</li>
                            <li>Chat directly with tenants</li>
                            <li>Priority support</li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey="upi" title="Pay with UPI">
                    <Row className="mt-3">
                      <Col md={7}>
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label className="upgrade-label">
                              UPI ID
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="upiId"
                              value={upiForm.upiId}
                              onChange={handleUpiChange}
                              isInvalid={!!errors.upiId}
                              placeholder="yourname@upi"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.upiId}
                            </Form.Control.Feedback>
                          </Form.Group>

                          <div className=" mb-3" style={{ fontSize: '0.85rem' }}>
                            You’ll see a GPay/PhonePe-style confirmation —
                            we’re just simulating it on frontend for now.
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <div className="" style={{ fontSize: '0.85rem' }}>
                              One-time upgrade fee:
                              <span style={{ color: GOLD, marginLeft: 6 }}>
                                ₹999
                              </span>
                            </div>
                            <Button
                              type="button"
                              className="btn-primary-custom px-4"
                              disabled={processing}
                              onClick={() => handlePay('upi')}
                            >
                              {processing ? (
                                <>
                                  <i className="fas fa-spinner fa-spin me-2" />
                                  Processing…
                                </>
                              ) : (
                                'Pay via UPI'
                              )}
                            </Button>
                          </div>
                        </Form>
                      </Col>

                      <Col md={5} className="mt-4 mt-md-0">
                        <div
                          className="p-3 rounded d-flex flex-column align-items-center justify-content-center"
                          style={{
                            background:
                              'radial-gradient(circle, rgba(5,5,8,0.4), #050508)',
                            border: '1px dashed rgba(212,175,55,0.5)',
                          }}
                        >
                          <i
                            className="fas fa-mobile-alt mb-2"
                            style={{ fontSize: '2rem', color: GOLD }}
                          />
                          <p className="mb-0 text-center " style={{ fontSize: '0.85rem' }}>
                            You’ll get a success tick similar to GPay / PhonePe
                            here once we confirm payment.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default UpgradeOwnerPage;
