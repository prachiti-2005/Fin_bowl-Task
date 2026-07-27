import React from "react";

// Maps a status string to a visual style key
const STATUS_STYLES = {
  Draft: "neutral",
  Submitted: "green",
  Verified: "blue",
  Processed: "amber",
  Audited: "violet",
  Paid: "green",
};

export default function Badge({ status, dot = true }) {
  const style = STATUS_STYLES[status] || "neutral";
  return (
    <span className={`fb-badge fb-badge--${style}`}>
      {dot && <span className="fb-badge__dot" />}
      {status}
    </span>
  );
}