// src/pages/admin/AdminChats.jsx
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Form,
  Button,
} from 'react-bootstrap';

const GOLD = '#D4AF37';
const DARK = '#050508';
const PANEL = '#0b0b10';
const TEXT = '#F5F5F5';

// Mock conversation data (pure frontend for now)
const initialConversations = [
  {
    id: 1,
    propertyId: 1,
    propertyTitle: 'Luxury 2BHK Apartment',
    participantName: 'Nishita Sara',
    lastMessage: 'Is it still available?',
    unread: 2,
    updatedAt: '5 mins ago',
    messages: [
      {
        id: 1,
        from: 'user',
        text: 'Hi, is the flat still available?',
        time: '10:30 AM',
      },
      {
        id: 2,
        from: 'admin',
        text: 'Hi Nishita, yes it is available this month.',
        time: '10:32 AM',
      },
      {
        id: 3,
        from: 'user',
        text: 'Okay great, can I visit this weekend?',
        time: '10:35 AM',
      },
    ],
  },
  {
    id: 2,
    propertyId: 2,
    propertyTitle: 'Modern Studio Apartment',
    participantName: 'Gokul Anbu',
    lastMessage: 'I will confirm by today.',
    unread: 0,
    updatedAt: '1 hour ago',
    messages: [
      {
        id: 1,
        from: 'user',
        text: 'Is the rent negotiable?',
        time: '09:00 AM',
      },
      {
        id: 2,
        from: 'admin',
        text: 'We can talk after your visit.',
        time: '09:05 AM',
      },
      {
        id: 3,
        from: 'user',
        text: 'Okay, I will confirm by today.',
        time: '09:10 AM',
      },
    ],
  },
];

const quickReplies = [
  'Yes, it is available.',
  'Rent is slightly negotiable.',
  'Please share your contact number.',
  'We can arrange a visit tomorrow.',
];

const AdminChats = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(initialConversations[0]?.id || null);
  const [input, setInput] = useState('');

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const handleSelectConversation = (id) => {
    setSelectedId(id);
    // mark unread as 0
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, unread: 0 } : c
      )
    );
  };

  const handleSend = (textFromBtn) => {
    const messageText = (textFromBtn || input).trim();
    if (!messageText || !selectedConversation) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== selectedConversation.id) return conv;
        const newMessage = {
          id: conv.messages.length + 1,
          from: 'admin',
          text: messageText,
          time: timeStr,
        };
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          updatedAt: 'Just now',
        };
      })
    );

    if (!textFromBtn) {
      setInput('');
    }
  };

  const handleQuickReply = (text) => {
    handleSend(text);
  };

  if (!selectedConversation) {
    return (
      <Container fluid className="p-0">
        <h2 className="admin-page-title">Chats</h2>
        <Card className="card-custom">
          <Card.Body>No conversations yet.</Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0">
      <style jsx="true">{`
        .admin-chat-shell {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .admin-chat-list-card {
          height: 520px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .admin-chat-list-scroll {
          overflow-y: auto;
          padding-right: 4px;
        }

        .admin-chat-item {
          border-radius: 12px;
          padding: 0.7rem 0.85rem;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-chat-item.active {
          background: radial-gradient(circle at left, rgba(212, 175, 55, 0.35), #15151e);
          box-shadow: 0 0 18px rgba(212, 175, 55, 0.45);
        }

        .admin-chat-item:hover:not(.active) {
          background: rgba(255, 255, 255, 0.04);
        }

        .admin-chat-name {
          color: ${TEXT};
          font-weight: 600;
          font-size: 0.9rem;
        }

        .admin-chat-property {
          color: #c3c3d0;
          font-size: 0.8rem;
        }

        .admin-chat-last {
          color: #9f9fb0;
          font-size: 0.8rem;
        }

        .admin-chat-time {
          color: #8a8a99;
          font-size: 0.75rem;
        }

        .admin-chat-main-card {
          height: 520px;
          display: flex;
          flex-direction: column;
        }

        .admin-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding-right: 6px;
        }

        .admin-chat-bubble {
          max-width: 70%;
          padding: 0.55rem 0.8rem;
          border-radius: 16px;
          margin-bottom: 0.35rem;
          font-size: 0.9rem;
        }

        .admin-chat-bubble.user {
          background: #15151e;
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: ${TEXT};
        }

        .admin-chat-bubble.admin {
          background: ${GOLD};
          color: #050508;
          margin-left: auto;
        }

        .admin-chat-time-mini {
          font-size: 0.75rem;
          color: #8c8c9a;
        }

        .admin-chat-quick-btn {
          font-size: 0.78rem;
          border-radius: 999px;
          padding: 0.25rem 0.7rem;
          background: transparent;
          border: 1px solid rgba(212, 175, 55, 0.5);
          color: ${TEXT};
          margin-right: 0.35rem;
          margin-bottom: 0.35rem;
        }

        .admin-chat-quick-btn:hover {
          background: rgba(212, 175, 55, 0.18);
        }
      `}</style>

      <h2 className="admin-page-title">Chats</h2>

      <div className="admin-chat-shell">
        <Row className="g-3">
          {/* LEFT: conversation list */}
          <Col md={4}>
            <Card className="card-custom admin-chat-list-card">
              <Card.Header className="card-header-custom d-flex justify-content-between align-items-center">
                <span>Conversations</span>
                <Badge bg="warning" text="dark">
                  {conversations.length}
                </Badge>
              </Card.Header>
              <Card.Body className="p-2">
                <div className="admin-chat-list-scroll">
                  <ListGroup variant="flush">
                    {conversations.map((conv) => (
                      <ListGroup.Item
                        key={conv.id}
                        className={`bg-transparent admin-chat-item ${
                          conv.id === selectedId ? 'active' : ''
                        }`}
                        onClick={() => handleSelectConversation(conv.id)}
                      >
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <div className="admin-chat-name">
                              {conv.participantName}
                            </div>
                            <div className="admin-chat-property">
                              {conv.propertyTitle}
                            </div>
                            <div className="admin-chat-last text-truncate">
                              {conv.lastMessage}
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="admin-chat-time">
                              {conv.updatedAt}
                            </div>
                            {conv.unread > 0 && (
                              <Badge bg="danger" pill>
                                {conv.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT: chat window */}
          <Col md={8}>
            <Card className="card-custom admin-chat-main-card">
              <Card.Header className="card-header-custom">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: GOLD,
                      }}
                    >
                      {selectedConversation.propertyTitle}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#c3c3d0' }}>
                      Chat with <strong>{selectedConversation.participantName}</strong>
                    </div>
                  </div>
                  <Badge bg="secondary">
                    Active · {selectedConversation.updatedAt}
                  </Badge>
                </div>
              </Card.Header>

              <Card.Body className="d-flex flex-column">
                <div className="admin-chat-messages mb-3">
                  {selectedConversation.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`d-flex ${
                        m.from === 'admin'
                          ? 'justify-content-end'
                          : 'justify-content-start'
                      }`}
                    >
                      <div>
                        <div
                          className={`admin-chat-bubble ${m.from}`}
                        >
                          {m.text}
                        </div>
                        <div
                          className={`admin-chat-time-mini ${
                            m.from === 'admin'
                              ? 'text-end'
                              : 'text-start'
                          }`}
                        >
                          {m.time}{' '}
                          {m.from === 'admin' ? '· You' : '· Tenant'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick replies */}
                <div className="mb-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr}
                      type="button"
                      className="admin-chat-quick-btn"
                      onClick={() => handleQuickReply(qr)}
                    >
                      {qr}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Type a reply to the user..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                      type="submit"
                      className="btn-primary-custom px-4"
                    >
                      Send
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AdminChats;
