// src/pages/MyMessagesPage.jsx  -> chat list

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getConversations } from "../services/messageService";

const ACCENT = "#D4AF37";
const DARK_BG = "#050508";
const CARD_DARK = "#0b0b10";
const TEXT_LIGHT = "#F5F5F5";

const formatDateTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString();
};

const MyMessagesPage = () => {
  const [convos, setConvos] = useState([]);

  useEffect(() => {
    setConvos(getConversations());
  }, []);

  return (
    <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>
      <style jsx="true">{`
        .mm-wrapper {
          padding: 3rem 0 4rem;
          background: radial-gradient(
            circle at top left,
            rgba(212, 175, 55, 0.15),
            ${DARK_BG}
          );
          color: ${TEXT_LIGHT};
        }

        .mm-title {
          font-size: 2rem;
          font-weight: 700;
          color: ${ACCENT};
        }

        .mm-sub {
          color: #cfcfcf;
          font-size: 0.95rem;
        }

        .mm-card {
          background: ${CARD_DARK};
          border-radius: 16px;
          border: 1px solid #22222f;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
        }

        .mm-property-title {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .mm-meta {
          font-size: 0.85rem;
          color: #d3d3d3;
        }

        .mm-msg-bubble {
          background: #151520;
          border-radius: 12px;
          padding: 0.6rem 0.8rem;
          font-size: 0.9rem;
          margin-bottom: 0.4rem;
        }

        .mm-open-btn {
          background: ${ACCENT};
          border-color: ${ACCENT};
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #050508;
        }
      `}</style>

      <Container className="mm-wrapper">
        <Row className="mb-4">
          <Col lg={8}>
            <h1 className="mm-title">Chats</h1>
            <p className="mm-sub">
              All properties you&apos;ve messaged the owner about.
            </p>
          </Col>
        </Row>

        {convos.length === 0 ? (
          <div className="text-center text-light py-5">
            <p>You haven&apos;t messaged any owners yet.</p>
            <p style={{ fontSize: "0.9rem", color: "#b5b5b5" }}>
              Open any property and tap &quot;Message Owner&quot; to start a
              conversation.
            </p>
          </div>
        ) : (
          <Row className="g-3">
            {convos.map((c) => {
              const lastMsg =
                c.messages && c.messages.length
                  ? c.messages[c.messages.length - 1]
                  : null;

              return (
                <Col key={c.id} xs={12} md={6} lg={4}>
                  <Card className="mm-card p-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <div className="mm-property-title">
                            {c.propertyTitle}
                          </div>
                          <div className="mm-meta">
                            <i className="fas fa-map-marker-alt me-1" />
                            {c.propertyLocation}
                          </div>
                        </div>
                        <Badge bg="dark">
                          {c.messages?.length || 0} messages
                        </Badge>
                      </div>

                      {lastMsg && (
                        <>
                          <div className="mm-meta mb-1">
                            Last message:{" "}
                            {formatDateTime(lastMsg.createdAt)}
                          </div>
                          <div className="mm-msg-bubble">
                            {lastMsg.text}
                          </div>
                        </>
                      )}

                      <div className="mt-3 text-end">
                        <Button
                          as={Link}
                          to={`/chats/${c.propertyId}`}
                          className="mm-open-btn"
                          size="sm"
                        >
                          Open Chat
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyMessagesPage;
