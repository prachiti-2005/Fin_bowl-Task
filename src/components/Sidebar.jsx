import React, { useState } from "react";
import {
  Home,
  Wallet,
  Clock,
  Landmark,
  ShieldCheck,
  Users,
  Wand2,
  FileText,
  Search,
  ChevronDown,
  LayoutDashboard,
  CircleDollarSign,
  Receipt,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const ICON_MAP = {
  home: Home,
  wallet: Wallet,
  clock: Clock,
  bank: Landmark,
  shield: ShieldCheck,
  users: Users,
  wand: Wand2,
  doc: FileText,
};

const CHILD_ICON_MAP = {
  Dashboard: LayoutDashboard,
  Disbursement: CircleDollarSign,
  Invoices: Receipt,
  PO: ClipboardList,
  "RMS Reports": BarChart3,
};

const NAV_SECTIONS = [
  { label: "Dashboard", icon: "home" },
  { label: "Finance", icon: "wallet", expandable: true },
  { label: "Sales CRM", icon: "clock", expandable: true },
  {
    label: "RMS",
    icon: "bank",
    expandable: true,
    children: ["Dashboard", "Disbursement", "Invoices", "PO", "RMS Reports"],
  },
  { label: "Compliance", icon: "shield", expandable: true },
  { label: "Vendors", icon: "users", expandable: true },
  { label: "AI Suite", icon: "wand", expandable: true },
  { label: "Reports", icon: "doc", expandable: true },
];

export default function Sidebar({ activePage, activeSubPage, onNavigate }) {
  const [expanded, setExpanded] = useState({ RMS: true });

  const toggleExpand = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fb-sidebar">
      <div className="fb-sidebar__brand">
        {/* <span className="fb-sidebar__logo" /> */}
        <span className="fb-sidebar__brand-name"><img src={Logo} alt="Finbowl Logo" /></span>
      </div>

      <div className="fb-sidebar__search">
        <Search size={16} className="fb-icon-search" />
        <input readOnly placeholder="Search" />
      </div>

      <nav className="fb-sidebar__nav">
        {NAV_SECTIONS.map((section) => {
          const IconComponent = ICON_MAP[section.icon];
          return (
            <div key={section.label} className="fb-sidebar__section">
              <button
                className={`fb-sidebar__item ${
                  activePage === section.label ? "fb-sidebar__item--active" : ""
                }`}
                onClick={() =>
                  section.children
                    ? toggleExpand(section.label)
                    : onNavigate(section.label, null)
                }
              >
                {IconComponent && (
                  <IconComponent size={18} className="fb-sidebar__icon" strokeWidth={1.75} />
                )}
                <span>{section.label}</span>
                {section.expandable && (
                  <ChevronDown
                    size={16}
                    className={`fb-sidebar__chevron ${
                      expanded[section.label] ? "fb-sidebar__chevron--open" : ""
                    }`}
                  />
                )}
              </button>

              {section.children && expanded[section.label] && (
                <div className="fb-sidebar__submenu">
                  {section.children.map((child) => {
                    const ChildIcon = CHILD_ICON_MAP[child];
                    return (
                      <button
                        key={child}
                        className={`fb-sidebar__subitem ${
                          activePage === section.label && activeSubPage === child
                            ? "fb-sidebar__subitem--active"
                            : ""
                        }`}
                        onClick={() => onNavigate(section.label, child)}
                      >
                        {ChildIcon && (
                          <ChildIcon size={15} className="fb-sidebar__subicon" strokeWidth={1.75} />
                        )}
                        {child}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="fb-sidebar__footer">
        <span className="fb-sidebar__version-dot" />
        Version 1.0
      </div>
    </aside>
  );
}
