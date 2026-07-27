// import React, { useState, useEffect, useRef } from "react";
// import Button from "./Button";

// const SAVED_VIEWS = ["Default View", "My Verified Loans", "Pending Audits", "This Month"];

// export default function SavedViewDropdown({ onApply }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState(SAVED_VIEWS[0]);
//   const [draftSelected, setDraftSelected] = useState(SAVED_VIEWS[0]);
//   const wrapperRef = useRef(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
//         setIsOpen(false);
//         setDraftSelected(selected); // reset unsaved changes if closed without action
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [isOpen, selected]);

//   const handleToggle = () => {
//     if (!isOpen) setDraftSelected(selected);
//     setIsOpen((prev) => !prev);
//   };

//   const handleApply = () => {
//     setSelected(draftSelected);
//     onApply && onApply(draftSelected);
//     setIsOpen(false);
//   };

//   const handleCancel = () => {
//     setDraftSelected(selected);
//     setIsOpen(false);
//   };

//   return (
//     <div className="fb-saved-view" ref={wrapperRef}>
//       <Button variant="outline" onClick={handleToggle}>
//         {selected}<ion-icon name="chevron-down-outline" className="fb-sidebar__chevron"></ion-icon>
//       </Button>

//       {isOpen && (
//         <div className="fb-saved-view__dropdown">
//           <ul className="fb-saved-view__list">
//             {SAVED_VIEWS.map((view) => (
//               <li key={view}>
//                 <label className="fb-radio">
//                   <input
//                     type="radio"
//                     name="saved-view"
//                     checked={draftSelected === view}
//                     onChange={() => setDraftSelected(view)}
//                   />
//                   <span>{view}</span>
//                 </label>
//               </li>
//             ))}
//           </ul>
//           <div className="fb-saved-view__actions">
//             <Button variant="ghost" onClick={handleCancel}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleApply}>
//               Apply
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

const BUILT_IN_VIEWS = ["Default View", "My Verified Loans", "Pending Audits", "This Month"];

export default function SavedViewDropdown({ savedViews = [], onApply }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(BUILT_IN_VIEWS[0]);
  const [draftSelected, setDraftSelected] = useState(BUILT_IN_VIEWS[0]);
  const wrapperRef = useRef(null);

  // Combine built-in views with custom ones created via ColumnFilterPanel.
  // Custom views are objects { name, columns }; built-ins are plain strings.
  const allViews = [...BUILT_IN_VIEWS, ...savedViews.map((v) => v.name)];

  // When a new custom view is created (savedViews grows), auto-select it.
  const prevCountRef = useRef(savedViews.length);
  useEffect(() => {
    if (savedViews.length > prevCountRef.current) {
      const latest = savedViews[savedViews.length - 1];
      setSelected(latest.name);
      setDraftSelected(latest.name);
    }
    prevCountRef.current = savedViews.length;
  }, [savedViews]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setDraftSelected(selected);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, selected]);

  const handleToggle = () => {
    if (!isOpen) setDraftSelected(selected);
    setIsOpen((prev) => !prev);
  };

  const resolveView = (name) => {
    // Look up the full { name, columns } object for custom views;
    // built-ins get passed through as plain strings.
    const custom = savedViews.find((v) => v.name === name);
    return custom || name;
  };

  const handleApply = () => {
    setSelected(draftSelected);
    onApply && onApply(resolveView(draftSelected));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setDraftSelected(selected);
    setIsOpen(false);
  };

  return (
    <div className="fb-saved-view" ref={wrapperRef}>
      <Button variant="outline" onClick={handleToggle}>
        {selected}
        <ion-icon name="chevron-down-outline" className="fb-sidebar__chevron"></ion-icon>
      </Button>

      {isOpen && (
        <div className="fb-saved-view__dropdown">
          <ul className="fb-saved-view__list">
            {allViews.map((view) => (
              <li key={view}>
                <label className="fb-radio">
                  <input
                    type="radio"
                    name="saved-view"
                    checked={draftSelected === view}
                    onChange={() => setDraftSelected(view)}
                  />
                  <span>{view}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="fb-saved-view__actions">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
