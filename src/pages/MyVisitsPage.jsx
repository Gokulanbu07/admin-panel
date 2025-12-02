// src/pages/MyVisitsPage.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { getBookings, cancelBooking } from "../services/bookingService";

const ACCENT = "#D4AF37";
const DARK_BG = "#050508";
const CARD_DARK = "#0b0b10";
const TEXT_LIGHT = "#F5F5F5";

const MyVisitsPage = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    setBookings(getBookings());
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = (id) => {
    cancelBooking(id);
    loadBookings();
  };

  return (
    <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>
      <style jsx="true">{`
        .mv-wrapper {
          padding: 3rem 0 4rem;
          background: radial-gradient(
            circle at top left,
            rgba(212, 175, 55, 0.15),
            ${DARK_BG}
          );
          color: ${TEXT_LIGHT};
        }

        .mv-title {
          font-size: 2rem;
          font-weight: 700;
          color: ${ACCENT};
        }

        .mv-sub {
          color: #cfcfcf;
          font-size: 0.95rem;
        }

        .mv-card {
          background: ${CARD_DARK};
          border-radius: 16px;
          border: 1px solid #22222f;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
        }

        .mv-property-title {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .mv-meta {
          font-size: 0.9rem;
          color: #d3d3d3;
        }

        .mv-badge {
          background: #15151f;
          border-radius: 999px;
          padding: 0.15rem 0.7rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .mv-btn-cancel {
          border-radius: 999px;
          font-size: 0.85rem;
        }
      `}</style>

      <Container className="mv-wrapper">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="mv-title">My Visits</h1>
            <p className="mv-sub">
              All your booked visit slots for different properties.
            </p>
          </Col>
        </Row>

        {bookings.length === 0 ? (
          <div className="text-center text-light py-5">
            <p>You have no visit bookings yet.</p>
          </div>
        ) : (
          <Row className="g-3">
            {bookings.map((b) => (
              <Col key={b.id} xs={12} md={6} lg={4}>
                <Card className="mv-card p-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="mv-property-title">
                          {b.propertyTitle}
                        </div>
                        <div className="mv-meta">
                          <i className="fas fa-map-marker-alt me-1" />
                          {b.propertyLocation}
                        </div>
                      </div>
                      <Badge className="mv-badge">{b.status}</Badge>
                    </div>

                    <div className="mv-meta mt-2">
                      <i className="far fa-calendar-alt me-2" />
                      {b.date}
                    </div>
                    <div className="mv-meta">
                      <i className="far fa-clock me-2" />
                      {b.time}
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        variant="outline-light"
                        className="mv-btn-cancel"
                        size="sm"
                        onClick={() => handleCancel(b.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyVisitsPage;
