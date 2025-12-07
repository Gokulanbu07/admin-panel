// src/components/admin/BookingTable.jsx
import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const BookingTable = ({ bookings, onUpdateStatus }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <Badge bg="success" pill>Accepted</Badge>;
      case 'rejected':
        return <Badge bg="danger" pill>Rejected</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark" pill>Pending</Badge>;
      default:
        return <Badge bg="secondary" pill>N/A</Badge>;
    }
  };

  const formatDate = (datetime) => {
    if (!datetime) return 'N/A';
    const date = new Date(datetime);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <>
      <style jsx="true">{`
        .booking-table tbody tr:hover {
          background: rgba(212, 175, 55, 0.06);
        }

        .booking-table td,
        .booking-table th {
          vertical-align: middle;
          font-size: 0.9rem;
        }

        .booking-name {
          font-weight: 600;
          color: #f5f5f5;
        }

        .booking-sub {
          font-size: 0.78rem;
          color: #a9a9b5;
        }

        .booking-actions button {
          border-radius: 999px;
          font-size: 0.78rem;
          padding-inline: 14px;
        }
      `}</style>

      <div className="table-responsive">
        <Table
          striped
          hover
          className="table-custom booking-table shadow-sm rounded-3 mb-0"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Property</th>
              <th>Requester</th>
              <th>Visit Date / Time</th>
              <th>Status</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-muted">
                  No bookings found for this filter.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>
                    <div className="booking-name">
                      {booking.property_title || 'Property'}
                    </div>
                    <div className="booking-sub">
                      #{booking.property_id || '--'}
                    </div>
                  </td>
                  <td>
                    <div className="booking-name">
                      {booking.user_name || 'User'}
                    </div>
                    <div className="booking-sub">
                      {booking.user_email || booking.user_phone || ''}
                    </div>
                  </td>
                  <td>
                    <div className="booking-name">
                      {formatDate(booking.visit_datetime)}
                    </div>
                    {booking.preferred_slot && (
                      <div className="booking-sub">
                        Slot: {booking.preferred_slot}
                      </div>
                    )}
                  </td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td className="booking-actions">
                    {booking.status === 'pending' ? (
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => onUpdateStatus(booking.id, 'accepted')}
                        >
                          <i className="fas fa-check me-1" />
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onUpdateStatus(booking.id, 'rejected')}
                        >
                          <i className="fas fa-times me-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span
                        className="text-muted"
                        style={{ fontSize: '0.8rem' }}
                      >
                        Action completed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BookingTable;
