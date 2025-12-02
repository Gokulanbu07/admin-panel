// src/pages/PropertyDetailPage.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Card,
  Modal,
  Form,
  Carousel,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import UserNavbar from "../components/common/UserNavbar";
import { mockProperties } from "../services/mockData";
import { isInWishlist, toggleWishlist } from "../services/wishlistService";
import { addBooking } from "../services/bookingService";
import { addMessage } from "../services/messageService";

const ACCENT = "#D4AF37";
const DARK_BG = "#050508";
const CARD_DARK = "#0b0b10";
const TEXT_LIGHT = "#F5F5F5";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const property = mockProperties.find((p) => p.id === Number(id));

  // 🔴 If no property matched this id
  if (!property) {
    return (
      <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>
        <UserNavbar />
        <div
          style={{
            color: "#ffffff",
            textAlign: "center",
            paddingTop: "5rem",
          }}
        >
          <h2>Property Not Found</h2>
          <p>This listing may have been removed or the URL is invalid.</p>
        </div>
      </div>
    );
  }

  const [wishlist, setWishlist] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
const [messageText, setMessageText] = useState("");
const [messageSuccess, setMessageSuccess] = useState("");

  useEffect(() => {
    setWishlist(isInWishlist(property.id));
  }, [property.id]);

  const handleToggleWishlist = () => {
    const current = toggleWishlist(property.id);
    setWishlist(current);
  };

  const handleOpenBooking = () => {
    setBookingSuccess("");
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!visitDate) {
      alert("Please choose a visit date.");
      return;
    }

    let finalTime = selectedSlot;
    if (!finalTime && customTime) {
      finalTime = `Custom: ${customTime}`;
    }

    if (!finalTime) {
      alert("Please select a time slot or choose a custom time.");
      return;
    }

    addBooking({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      date: visitDate,
      time: finalTime,
    });

    setVisitDate("");
    setSelectedSlot("");
    setCustomTime("");

    setShowBookingModal(false);
    setBookingSuccess("Visit booked successfully!");
  };


  const handleSendMessage = (e) => {
  e.preventDefault();

  if (!messageText.trim()) {
    alert("Please type a message.");
    return;
  }

  addMessage(property, messageText.trim());

  setMessageText("");
  setShowMessageModal(false);
  setMessageSuccess("Message sent to owner!");

  // Auto-hide success after few seconds (optional)
  setTimeout(() => setMessageSuccess(""), 3000);
};


  return (
    <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>

      <style jsx="true">{`
        .pd-wrapper {
          padding: 3rem 0 4rem;
          background: radial-gradient(
            circle at top left,
            rgba(212, 175, 55, 0.16),
            ${DARK_BG}
          );
          color: ${TEXT_LIGHT};
        }

        .pd-main-card {
          background: ${CARD_DARK};
          border-radius: 18px;
          padding: 1.4rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.9);
          position: relative;
        }

        .pd-carousel img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 14px;
        }

        .pd-heart-btn {
          position: absolute;
          top: 18px;
          right: 20px;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(212, 175, 55, 0.7);
          background: rgba(5, 5, 8, 0.75);
          color: ${ACCENT};
          cursor: pointer;
          transition: 0.25s;
          z-index: 5;
        }

        .pd-heart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.9);
        }

        .pd-heart-btn.active {
          background: ${ACCENT};
          color: #050508;
        }

        .pd-title {
          font-size: 2rem;
          font-weight: 700;
          color: ${ACCENT};
        }

        .pd-subtext {
          color: #cfcfcf;
          font-size: 0.95rem;
        }

        .pd-meta {
          font-size: 0.9rem;
          color: #e2e2e2;
        }

        .pd-right-card {
          background: ${CARD_DARK};
          border-radius: 18px;
          padding: 1.7rem;
          border: 1px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.9);
        }

        .pd-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: ${ACCENT};
        }

        .pd-btn-gold {
          background-color: ${ACCENT};
          border-color: ${ACCENT};
          border-radius: 10px;
          font-weight: 600;
          color: #050508;
        }

        .pd-btn-gold:hover {
          background-color: #c59a24;
          border-color: #c59a24;
          color: #050508;
        }

        .pd-section-card {
          background: ${CARD_DARK};
          border-radius: 18px;
          padding: 1.8rem;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.9);
          margin-bottom: 1.8rem;
        }

        .pd-section-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: ${ACCENT};
          margin-bottom: 0.7rem;
        }

        .pd-section-card p,
        .pd-section-card li {
          color: #e4e4e4;
        }

        .pd-section-card ul {
          margin-bottom: 0;
        }

        .amenity-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          margin: 0.25rem 0.35rem 0.25rem 0;
          font-size: 0.85rem;
          color: #f2f2f2;
          background: #111118;
        }

        .pd-badge-type {
          background: #15151f;
          border-radius: 999px;
          padding: 0.2rem 0.8rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #e2e2e2;
        }

        .booking-modal .modal-content {
          background: #0b0b10;
          border-radius: 14px;
          border: 1px solid ${ACCENT};
          color: ${TEXT_LIGHT};
        }

        .booking-modal input,
        .booking-modal textarea {
          background: #1b1b22;
          border-radius: 10px;
          border: 1px solid #30303a;
          color: ${TEXT_LIGHT};
        }

        .booking-modal input:focus,
        .booking-modal textarea:focus {
          border-color: ${ACCENT};
          box-shadow: 0 0 8px ${ACCENT};
        }

        @media (max-width: 992px) {
          .pd-carousel img {
            height: 260px;
          }
        }
      `}</style>

      <Container className="pd-wrapper">
        <Row className="g-4">
          {/* LEFT: Image + title */}
          <Col lg={8}>
            <div className="pd-main-card">
              <button
                className={`pd-heart-btn ${wishlist ? "active" : ""}`}
                onClick={handleToggleWishlist}
                aria-label="Save to wishlist"
              >
                <i className={wishlist ? "fas fa-heart" : "far fa-heart"}></i>
              </button>

              <Carousel className="pd-carousel" interval={4000}>
                {property.images?.map((img) => (
                  <Carousel.Item key={img}>
                    <img src={img} alt="Property view" />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className="mt-3">
                <h1 className="pd-title">{property.title}</h1>
                <p className="pd-subtext mb-1">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {property.location}
                </p>
                <span className="pd-badge-type">{property.category}</span>

                <div className="mt-3 pd-meta">
                  {property.bedrooms} Beds • {property.bathrooms} Baths •{" "}
                  {property.size}
                </div>
              </div>
            </div>
          </Col>

          {/* RIGHT: Price + buttons */}
          <Col lg={4}>
            <div className="pd-right-card">
              <div
                className="mb-2"
                style={{ fontSize: "0.9rem", color: "#cfcfcf" }}
              >
                Approx. Rent
              </div>
              <div className="pd-price">₹ {property.price}</div>
              <div className="pd-subtext mt-1">
                Expected monthly rent (negotiable)
              </div>

              <div className="d-grid gap-3 mt-4">
                <Button className="pd-btn-gold" onClick={handleOpenBooking}>
                  Book Visit Slot
                </Button>
              <Button
  className="pd-btn-gold"
  onClick={() => {
    setMessageSuccess("");
    setShowMessageModal(true);
  }}
>
  Message Owner
</Button>

              </div>

              {bookingSuccess && (
                <div
                  className="mt-3"
                  style={{ color: "#4CAF50", fontSize: "0.9rem" }}
                >
                  <i className="fas fa-check-circle me-2" />
                  {bookingSuccess}
                </div>
              )}

              {messageSuccess && (
  <div className="mt-1" style={{ color: "#4CAF50", fontSize: "0.85rem" }}>
    <i className="fas fa-paper-plane me-2" />
    {messageSuccess}
  </div>
)}
            </div>
          </Col>
        </Row>

        {/* Highlights + amenities */}
        <Row className="mt-4">
          <Col lg={8}>
            <div className="pd-section-card">
              <div className="pd-section-title">Highlights</div>
              <ul>
                {property.highlights?.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <div className="pd-section-title mt-4">Description</div>
              <p>
                A beautifully maintained premium apartment with great locality
                and facilities. Ideal for families and working professionals.
              </p>
            </div>

            <div className="pd-section-card">
              <div className="pd-section-title">Amenities</div>
              <div>
                {property.amenities?.map((a) => (
                  <span key={a} className="amenity-pill">
                    <i
                      className="fas fa-check"
                      style={{ color: ACCENT }}
                    ></i>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Message Owner Modal */}
{/* Message Owner Modal */}
<Modal
  show={showMessageModal}
  onHide={() => setShowMessageModal(false)}
  className="booking-modal"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Message Owner</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSendMessage}>
      <Form.Group className="mb-3">
        <Form.Label>Quick Messages</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {[
            "Is this still available?",
            "Please share your contact number.",
            "Can I schedule a visit this weekend?",
          ].map((msg) => (
            <Button
              key={msg}
              type="button"
              size="sm"
              style={{
                backgroundColor: "rgba(212,175,55,0.12)",
                borderColor: "rgba(212,175,55,0.3)",
                color: "#F5F5F5",
                borderRadius: "999px",
                fontSize: "0.75rem",
              }}
              onClick={() => setMessageText(msg)}
            >
              {msg}
            </Button>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Your Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Introduce yourself, mention your job/family, and ask about availability..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" className="pd-btn-gold w-100">
        Send Message
      </Button>
    </Form>
  </Modal.Body>
</Modal>



      {/* Booking Modal */}
      <Modal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        className="booking-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Book Visit Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBookingSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Visit Date</Form.Label>
              <Form.Control
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
              />
            </Form.Group>

            {property.timeSlots && property.timeSlots.length > 0 && (
              <Form.Group className="mb-3">
                <Form.Label>Available Time Slots</Form.Label>
                <div>
                  {property.timeSlots.map((slot) => (
                    <Form.Check
                      key={slot}
                      type="radio"
                      id={slot}
                      name="timeSlot"
                      label={slot}
                      className="mb-1"
                      checked={selectedSlot === slot}
                      onChange={() => {
                        setSelectedSlot(slot);
                        setCustomTime("");
                      }}
                    />
                  ))}
                </div>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Or Choose Custom Time</Form.Label>
              <Form.Control
                type="time"
                value={customTime}
                onChange={(e) => {
                  setCustomTime(e.target.value);
                  setSelectedSlot("");
                }}
              />
              <Form.Text className="text-muted">
                If you pick a slot above, custom time is ignored.
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="pd-btn-gold w-100">
              Confirm Booking
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PropertyDetailPage;
