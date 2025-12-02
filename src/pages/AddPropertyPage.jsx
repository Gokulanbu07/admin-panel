import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/common/UserNavbar";

const ACCENT_COLOR = "#D4AF37";
const BACKGROUND_DARK = "#050508";

const AddPropertyPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    propertyType: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Property Submitting:", formData);

    // After save → redirect
    navigate("/my-properties");
  };

  return (
    <div style={{ backgroundColor: BACKGROUND_DARK, minHeight: "100vh" }}>
      <UserNavbar />

      <style jsx="true">{`
        .ap-wrapper {
          padding: 3.5rem 0;
          background: radial-gradient(
              circle at top left,
              rgba(212, 175, 55, 0.1),
              ${BACKGROUND_DARK}
          );
          color: white;
        }

        .ap-card {
          background: #0d0d12;
          border-radius: 18px;
          padding: 2.2rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 22px 50px rgba(0, 0, 0, 0.8);
        }

        .ap-title {
          font-size: 2rem;
          font-weight: bold;
          color: ${ACCENT_COLOR};
        }

        .ap-label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .ap-input {
          background: #1b1b22;
          border: 1px solid #2c2c38;
          color: white;
          border-radius: 10px;
        }

        .ap-input:focus {
          border-color: ${ACCENT_COLOR};
          box-shadow: 0 0 6px ${ACCENT_COLOR};
        }

        .ap-btn {
          background-color: ${ACCENT_COLOR};
          border-color: ${ACCENT_COLOR};
          font-weight: 600;
          padding: 0.8rem;
          border-radius: 10px;
          color: #050508;
        }

        .ap-btn:hover {
          background-color: #c59a24;
        }
      `}</style>

      <Container className="ap-wrapper">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="ap-card">
              <p className="ap-title mb-4">Add New Property 🏡</p>

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="ap-label">Title</Form.Label>
                    <Form.Control
                      name="title"
                      placeholder="Ex: 2BHK Apartment in Chennai"
                      className="ap-input"
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label className="ap-label">Price (₹)</Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      className="ap-input"
                      placeholder="Ex: 10,000"
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="ap-label">City</Form.Label>
                    <Form.Control
                      name="city"
                      placeholder="Chennai, Bangalore, Mumbai..."
                      className="ap-input"
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col md={6}>
                    <Form.Label className="ap-label">Property Type</Form.Label>
                    <Form.Select
                      name="propertyType"
                      className="ap-input"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>PG</option>
                      <option>Room</option>
                      <option>Villa</option>
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <Form.Label className="ap-label">Bedrooms</Form.Label>
                    <Form.Control
                      type="number"
                      name="bedrooms"
                      className="ap-input"
                      placeholder="Ex: 2"
                      onChange={handleChange}
                      required
                    />
                  </Col>

                  <Col>
                    <Form.Label className="ap-label">Bathrooms</Form.Label>
                    <Form.Control
                      type="number"
                      name="bathrooms"
                      className="ap-input"
                      placeholder="Ex: 1"
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="ap-label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    className="ap-input"
                    placeholder="Describe property features, locality, furnished status etc."
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* OPTIONAL FILE UPLOAD (UI ONLY) */}
                <Form.Group className="mb-4">
                  <Form.Label className="ap-label">Upload Property Image</Form.Label>
                  <Form.Control
                    type="file"
                    className="ap-input"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0]?.name })
                    }
                  />
                </Form.Group>

                <Button type="submit" className="ap-btn w-100 mt-3">
                  Save Property
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPropertyPage;
