import React, { useEffect } from "react";
import Badge from "./Badge";
import { ACTIVITY_LOG } from "../data/mockData";

export default function ActivityLogPanel({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fb-overlay" onClick={onClose}>
      <div className="fb-activity-panel" onClick={(e) => e.stopPropagation()}>
        <div className="fb-activity-panel__header">
          <h2>Activity Log</h2>
          <button className="fb-activity-panel__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="fb-activity-panel__list">
          {ACTIVITY_LOG.map((entry, i) => (
            <div key={i} className="fb-activity-entry">
              <div className="fb-activity-entry__row">
                <span className="fb-activity-entry__avatar" />
                <div className="fb-activity-entry__info">
                  <div className="fb-activity-entry__type">{entry.type}</div>
                  <div className="fb-activity-entry__user">{entry.user}</div>
                </div>
                <div className="fb-activity-entry__date">{entry.date}</div>
              </div>

              {entry.change && (
                <div className="fb-activity-change">
                  {entry.change.field && (
                    <div className="fb-activity-change__field">{entry.change.field}</div>
                  )}
                  <div className="fb-activity-change__values">
                    <div>
                      <div className="fb-field-label">From</div>
                      {entry.change.isStatus ? (
                        <Badge status={entry.change.from} />
                      ) : (
                        <div className="fb-field-value">{entry.change.from}</div>
                      )}
                    </div>
                    <div>
                      <div className="fb-field-label">To</div>
                      {entry.change.isStatus ? (
                        <Badge status={entry.change.to} />
                      ) : (
                        <div className="fb-field-value">{entry.change.to}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}