import React from "react";

export default function TopBar({ right }) {
  return (
    <header className="fb-topbar">
      <div className="fb-workspace-switcher">
        <span className="fb-icon fb-icon-building" />
          Gracia Advisory Group
        <ion-icon name="chevron-down-outline" class="fb-sidebar__chevron"></ion-icon>
      </div>
      <div className="fb-workspace-switcher">
        <span className="fb-icon fb-icon-building" />
        ABC Advisory Group
        <ion-icon name="chevron-down-outline" class="fb-sidebar__chevron"></ion-icon>
      </div>
      <div className="fb-topbar__spacer" />
      {right}

      <span className="fb-topbar__bell">
        <ion-icon name="notifications-outline"></ion-icon>
      <span className="fb-topbar__badge">2</span>
      </span>
      <span className="fb-topbar__avatar" />
    </header>
  );
}