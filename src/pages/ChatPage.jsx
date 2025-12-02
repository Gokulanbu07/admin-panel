// src/pages/ChatPage.jsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockProperties } from "../services/mockData";
import {
  getConversationByPropertyId,
  addMessage,
} from "../services/messageService";

const ACCENT = "#D4AF37";
const DARK_BG = "#050508";
const CARD_DARK = "#0b0b10";
const TEXT_LIGHT = "#F5F5F5";

const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatPage = () => {
  const { propertyId } = useParams();
  const numericId = Number(propertyId);
  const navigate = useNavigate();

  const property = mockProperties.find((p) => p.id === numericId);
  const [conversation, setConversation] = useState(null);
  const [messageText, setMessageText] = useState("");

  const quickMessages = [
    "Is this still available?",
    "Please share your contact number.",
    "Can I schedule a visit this weekend?",
  ];

  useEffect(() => {
    if (!property) return;
    const convo = getConversationByPropertyId(property.id);
    if (!convo) {
      // no chat yet -> go back to detail page
      navigate(`/properties/${property.id}`, { replace: true });
      return;
    }
    setConversation(convo);
  }, [property, navigate]);

  if (!property) {
    return (
      <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>
        <Container className="pt-5 text-center text-light">
          <h3>Property Not Found</h3>
          <Button as={Link} to="/chats" variant="outline-light" className="mt-3">
            Back to Chats
          </Button>
        </Container>
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const updated = addMessage(property, messageText.trim());
    setConversation(updated);
    setMessageText("");
  };

  return (
    <div style={{ backgroundColor: DARK_BG, minHeight: "100vh" }}>
      <style jsx="true">{`
        .chat-wrapper {
          padding: 3rem 0 4rem;
          background: radial-gradient(
            circle at top left,
            rgba(212, 175, 55, 0.15),
            ${DARK_BG}
          );
          color: ${TEXT_LIGHT};
        }

        .chat-property-card {
          background: ${CARD_DARK};
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
        }

        .chat-main-card {
          background: ${CARD_DARK};
          border-radius: 16px;
          border: 1px solid #22222f;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          height: 70vh;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.4rem;
        }

        .chat-input {
          border-top: 1px solid #22222f;
          padding: 0.9rem 1.4rem;
          background: #07070c;
          border-radius: 0 0 16px 16px;
        }

        .msg-bubble {
          max-width: 80%;
          padding: 0.55rem 0.8rem;
          border-radius: 14px;
          margin-bottom: 0.35rem;
          font-size: 0.9rem;
        }

        .msg-user {
          background: ${ACCENT};
          color: #050508;
          margin-left: auto;
          border-bottom-right-radius: 4px;
        }

        .msg-meta {
          font-size: 0.7rem;
          color: #b5b5b5;
          text-align: right;
          margin-top: 0.1rem;
        }

        .quick-btn {
          background: rgba(212, 175, 55, 0.12);
          border-color: rgba(212, 175, 55, 0.3);
          border-radius: 999px;
          font-size: 0.75rem;
          color: #f5f5f5;
        }
      `}</style>

      <Container className="chat-wrapper">
        <Row className="g-4">
          {/* Left: property info */}
          <Col lg={4}>
            <Card className="chat-property-card p-3 mb-3 mb-lg-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title style={{ color: ACCENT, fontSize: "1.1rem" }}>
                      {property.title}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "0.85rem", color: "#d3d3d3" }}>
                      <i className="fas fa-map-marker-alt me-1" />
                      {property.location}
                    </Card.Text>
                    <Card.Text style={{ color: ACCENT, fontWeight: 600 }}>
                      ₹ {property.price}
                    </Card.Text>
                  </div>
                </div>
                <Button
                  as={Link}
                  to={`/properties/${property.id}`}
                  variant="outline-light"
                  size="sm"
                  className="mt-2"
                  style={{ borderRadius: "999px", fontSize: "0.8rem" }}
                >
                  View Property
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: chat */}
          <Col lg={8}>
            <Card className="chat-main-card">
              <div className="chat-messages">
                {!conversation || !conversation.messages?.length ? (
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "2rem",
                      color: "#b5b5b5",
                      fontSize: "0.9rem",
                    }}
                  >
                    This is the start of your chat with the owner.
                  </div>
                ) : (
                  conversation.messages.map((m) => (
                    <div key={m.id} style={{ marginBottom: "0.4rem" }}>
                      <div className="msg-bubble msg-user">{m.text}</div>
                      <div className="msg-meta">
                        You • {formatTime(m.createdAt)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="chat-input">
                <Form onSubmit={handleSend}>
                  <div className="d-flex flex-wrap gap-2 mb-2">
                    {quickMessages.map((q) => (
                      <Button
                        key={q}
                        type="button"
                        size="sm"
                        className="quick-btn"
                        onClick={() => setMessageText(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <Button type="submit" style={{ background: ACCENT, borderColor: ACCENT }}>
                      <i className="fas fa-paper-plane" />
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChatPage;
