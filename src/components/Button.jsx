import React from "react";

const ICON_MAP = {
  archive: "archive-outline",
  clock: "time-outline",
  edit: "create-outline",
  search: "search-outline",
  upload: "cloud-upload-outline",
};

/**
 * Generic reusable button.
 * variant: "primary" | "secondary" | "ghost" | "outline"
 */
export default function Button({
  children,
  variant = "secondary",
  icon,
  onClick,
  disabled,
  className = "",
  ...rest
}) {
  const iconName = icon && (ICON_MAP[icon] || icon);

  return (
    <button
      className={`fb-btn fb-btn--${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {iconName && <ion-icon name={iconName} className="fb-btn__icon"></ion-icon>}
      {children}
    </button>
  );
}