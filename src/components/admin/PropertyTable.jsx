// src/components/admin/PropertyTable.jsx
import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const PropertyTable = ({ properties, onDelete, onEdit }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return <Badge bg="success" pill>Available</Badge>;
      case 'Rented':
        return <Badge bg="warning" text="dark" pill>Rented</Badge>;
      case 'Archived':
        return <Badge bg="danger" pill>Archived</Badge>;
      default:
        return <Badge bg="secondary" pill>N/A</Badge>;
    }
  };

  return (
    <>
      <style jsx="true">{`
        .property-table tbody tr:hover {
          background: rgba(212, 175, 55, 0.06);
        }

        .property-table td,
        .property-table th {
          vertical-align: middle;
          font-size: 0.9rem;
        }

        .prop-title {
          font-weight: 600;
          color: #f5f5f5;
        }

        .prop-sub {
          font-size: 0.78rem;
          color: #a9a9b5;
        }

        .prop-image {
          width: 70px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prop-actions button {
          border-radius: 999px;
          font-size: 0.78rem;
          padding-inline: 14px;
        }
      `}</style>

      <div className="table-responsive">
        <Table
          striped
          hover
          className="table-custom property-table shadow-sm rounded-3 mb-0"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Property</th>
              <th>Owner</th>
              <th>Price / Mo</th>
              <th>Status</th>
              <th style={{ width: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-muted">
                  No properties found.
                </td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>
                    <img
                      src={
                        property.main_image ||
                        'https://placehold.co/120x80?text=No+Image'
                      }
                      alt={property.title}
                      className="prop-image"
                    />
                  </td>
                  <td>
                    <div className="prop-title">
                      {property.title || 'Untitled Property'}
                    </div>
                    <div className="prop-sub">
                      {property.city || ''}{' '}
                      {property.address_line ? `• ${property.address_line}` : ''}
                    </div>
                  </td>
                  <td>
                    <div className="prop-title">
                      {property.owner_name || 'Owner'}
                    </div>
                    <div className="prop-sub">
                      ID: {property.owner_id || '--'}
                    </div>
                  </td>
                  <td>
                    <div className="prop-title">
                      ₹
                      {property.price
                        ? property.price.toLocaleString()
                        : 'N/A'}
                    </div>
                    <div className="prop-sub">
                      {property.bedrooms || 0} BR •{' '}
                      {property.bathrooms || 0} BA
                    </div>
                  </td>
                  <td>{getStatusBadge(property.status)}</td>
                  <td className="prop-actions">
                    <div className="d-flex gap-2">
                      <Button
                        variant="info"
                        size="sm"
                        className="text-white"
                        onClick={() => onEdit(property.id)}
                      >
                        <i className="fas fa-edit me-1" />
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDelete(property.id)}
                      >
                        <i className="fas fa-archive me-1" />
                        Archive
                      </Button>
                    </div>
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

export default PropertyTable;
