// src/components/common/StatsCard.jsx
import React from "react";
import { Card } from "react-bootstrap";

const StatsCard = ({ title, value, icon, color = "#D4AF37" }) => {
  const formattedValue =
    typeof value === "number" ? value.toLocaleString() : value;

  const iconWrapperStyle = {
    width: 52,
    height: 52,
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `radial-gradient(circle, ${color}, transparent 65%)`,
    color: "#050508",
    boxShadow: `0 0 18px ${color}55`,
    flexShrink: 0,
  };

  return (
    <>
      <style jsx="true">{`
        .stats-card {
          position: relative;
          overflow: hidden;
          background: radial-gradient(
              circle at top left,
              rgba(212, 175, 55, 0.18),
              transparent 55%
            ),
            rgba(10, 10, 16, 0.96);
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.28);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.75);
          transition: transform 0.22s ease, box-shadow 0.22s ease,
            border-color 0.22s ease;
        }

        .stats-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.06),
            transparent 60%
          );
          opacity: 0.7;
          pointer-events: none;
        }

        .stats-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 26px 60px rgba(0, 0, 0, 0.9);
          border-color: rgba(212, 175, 55, 0.6);
        }

        .stats-card-body {
          position: relative;
          z-index: 1;
        }

        .stats-card-title {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #a7a7b5;
          margin-bottom: 0.4rem;
        }

        .stats-card-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #f5f5f5;
        }
      `}</style>

      <Card className="card-custom stats-card h-100">
        <Card.Body className="p-3 d-flex justify-content-between align-items-center stats-card-body">
          <div>
            <p className="stats-card-title mb-1">{title}</p>
            <div className="stats-card-value">{formattedValue}</div>
          </div>
          <div style={iconWrapperStyle}>
            <i className={`fas fa-lg ${icon}`}></i>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default StatsCard;
