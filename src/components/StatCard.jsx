import React from "react";

export default function StatCard({ label, value, highlight = false }) {
  return (
    <div className={`fb-stat-card ${highlight ? "fb-stat-card--highlight" : ""}`}>
      <div className="fb-stat-card__label">{label}</div>
      <div className="fb-stat-card__value">{value}</div>
    </div>
  );
}