import React from "react";

export default function TopBar({ right }) {
  return (
    <header className="fb-topbar">
      <div className="fb-workspace-switcher">
        <ion-icon name="business-outline" class="fb-icon"></ion-icon>
        Gracia Advisory Group
        <ion-icon name="chevron-down-outline" class="fb-sidebar__chevron"></ion-icon>
      </div>
      <div className="fb-workspace-switcher">
        <ion-icon name="business-outline" class="fb-icon"></ion-icon>
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
