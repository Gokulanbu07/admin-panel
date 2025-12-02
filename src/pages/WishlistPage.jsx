// src/pages/WishlistPage.jsx

import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserNavbar from "../components/common/UserNavbar";
import { mockProperties } from "../services/mockData";
import {
  getWishlistIds,
  removeFromWishlist,
} from "../services/wishlistService";

const ACCENT = "#D4AF37";
const DARK_BG = "#050508";
const CARD_DARK = "#0b0b10";
const TEXT_LIGHT = "#F5F5F5";

const WishlistPage = () => {
  const navigate = useNavigate();
  const wishlistIds = getWishlistIds();
  const wishlistProps = mockProperties.filter((p) =>
    wishlistIds.includes(p.id)
  );

  const handleRemove = (id) => {
    removeFromWishlist(id);
    navigate(0); // simple refresh for now
  };

  return (
    <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>
      <UserNavbar />

      <style jsx="true">{`
        .wl-wrapper {
          padding: 3rem 0 4rem;
          background: radial-gradient(
            circle at top left,
            rgba(212, 175, 55, 0.15),
            ${DARK_BG}
          );
          color: ${TEXT_LIGHT};
        }

        .wl-title {
          font-size: 2rem;
          font-weight: 700;
          color: ${ACCENT};
        }

        .wl-sub {
          color: #cfcfcf;
          font-size: 0.95rem;
        }

        .wl-card {
          background: ${CARD_DARK};
          border-radius: 16px;
          border: 1px solid #22222f;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .wl-card img {
          height: 180px;
          object-fit: cover;
        }

        .wl-card-title {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .wl-price {
          color: ${ACCENT};
          font-weight: 700;
        }

        .wl-meta {
          font-size: 0.85rem;
          color: #c2c2c2;
        }

        .wl-btn-view {
          background-color: ${ACCENT};
          border-color: ${ACCENT};
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #050508;
        }

        .wl-btn-remove {
          border-radius: 999px;
          font-size: 0.85rem;
        }
      `}</style>

      <Container className="wl-wrapper">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="wl-title">My Wishlist</h1>
            <p className="wl-sub">
              Homes you&apos;ve saved. Review them and plan your visits when
              you&apos;re ready.
            </p>
          </Col>
        </Row>

        {wishlistProps.length === 0 ? (
          <div className="text-center text-light py-5">
            <p className="mb-3">You have no saved properties yet.</p>
            <Button as={Link} to="/browse" className="wl-btn-view">
              Browse Properties
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {wishlistProps.map((p) => (
              <Col key={p.id} xs={12} md={6} lg={4}>
                <Card className="wl-card">
                  <Card.Img
                    src={p.images?.[0]}
                    alt={p.title}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="wl-card-title">
                      {p.title}
                    </Card.Title>
                    <Card.Text className="wl-meta mb-1">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {p.location}
                    </Card.Text>
                    <Card.Text className="wl-price mb-3">
                      ₹ {p.price}
                    </Card.Text>

                    <div className="mt-auto d-flex gap-2">
                      <Button
                        as={Link}
                        to={`/properties/${p.id}`}
                        className="wl-btn-view flex-grow-1"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline-light"
                        className="wl-btn-remove"
                        onClick={() => handleRemove(p.id)}
                      >
                        <i className="far fa-trash-alt"></i>
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

export default WishlistPage;
