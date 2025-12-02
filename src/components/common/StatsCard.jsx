// src/components/common/StatsCard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const StatsCard = ({ title, value, icon, color }) => {
    // Custom style for the icon background using dynamic color
    const iconStyle = {
        backgroundColor: color || 'var(--primary-color)',
        opacity: 0.15,
        color: color || 'var(--primary-color)',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Card className="card-custom h-100">
            <Card.Body className="p-4 d-flex justify-content-between align-items-center">
                <div>
                    <p className="text-muted mb-1" style={{ fontSize: '0.9rem', fontWeight: '500' }}>
                        {title}
                    </p>
                    <h3 className="fw-bold mb-0">{value.toLocaleString()}</h3>
                </div>
                <div style={iconStyle}>
                    <i className={`fas fa-2x ${icon}`}></i>
                </div>
            </Card.Body>
        </Card>
    );
};

export default StatsCard;

