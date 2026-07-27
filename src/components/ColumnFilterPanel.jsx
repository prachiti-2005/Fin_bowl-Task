import React, { useEffect, useRef, useState } from "react";

const ALL_COLUMNS = [
  "Disbursement Date",
  "Loan ID",
  "Applicant Name",
  "Bank Name",
  "Loan Type",
  "Applicant Name",
  "Sanctioned Amt",
  "Disbursed Amt",
  "Balanced Amt",
  "Status",
];

/**
 * Two-step filter flow:
 * 1. Clicking the filter/slider button opens a checklist popup with Save / Cancel.
 * 2. Clicking Save opens a second popup to name and create a custom view.
 * 3. On confirming the custom view, it's reported to the parent (onCreateView)
 *    so it can be appended to the "Saved Views" dropdown.
 *
 * Column visibility is only committed (via onApplyColumns) when the user
 * finishes step 2 — Cancel at either step discards the in-progress changes.
 */
export default function ColumnFilterPanel({
  isOpen,
  onClose,
  visibleColumns,
  onApplyColumns, // (columnsMap) => void  -- commits column selection
  onCreateView,   // (viewName, columnsMap) => void -- adds a new saved view
}) {
  const panelRef = useRef(null);
  const nameModalRef = useRef(null);

  // Step 1: local draft of column selection, seeded from current visibleColumns
  // whenever the panel opens, so Cancel doesn't lose prior state.
  const [draftColumns, setDraftColumns] = useState(visibleColumns || {});
  const [step, setStep] = useState("select"); // "select" | "name"
  const [viewName, setViewName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setDraftColumns(visibleColumns || {});
      setStep("select");
      setViewName("");
    }
  }, [isOpen, visibleColumns]);

  // Close step-1 panel on outside click (only while in "select" step,
  // so an outside click doesn't accidentally dismiss the naming modal).
  useEffect(() => {
    if (!isOpen || step !== "select") return;
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, step, onClose]);

  if (!isOpen) return null;

  const toggleDraftColumn = (col) => {
    setDraftColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const handleCancelSelect = () => {
    setDraftColumns(visibleColumns || {});
    onClose();
  };

  const handleSaveSelect = () => {
    // Move to step 2: name the view. Column changes aren't applied yet.
    setStep("name");
  };

  const handleCancelName = () => {
    // Go back to editing columns rather than closing entirely.
    setStep("select");
  };

  const handleSaveView = () => {
    const trimmedName = viewName.trim();
    if (!trimmedName) return;

    // Commit the column visibility change.
    onApplyColumns?.(draftColumns);
    // Report the new custom view so parent can push it into the dropdown.
    onCreateView?.(trimmedName, draftColumns);

    setStep("select");
    setViewName("");
    onClose();
  };

  return (
    <>
      {step === "select" && (
        <div className="fb-filter-panel" ref={panelRef}>
          <div className="fb-filter-panel__search">
            <span className="fb-icon-search" />
            <input readOnly placeholder="Search for Loans" />
          </div>
          <ul className="fb-filter-panel__list">
            {ALL_COLUMNS.map((col, idx) => (
              <li key={`${col}-${idx}`}>
                <label className="fb-checkbox">
                  <input
                    type="checkbox"
                    checked={!!draftColumns[col]}
                    onChange={() => toggleDraftColumn(col)}
                  />
                  <span>{col}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="fb-filter-panel__actions">
            <button
              type="button"
              className="fb-btn fb-btn--secondary"
              onClick={handleCancelSelect}
            >
              Cancel
            </button>
            <button
              type="button"
              className="fb-btn fb-btn--primary"
              onClick={handleSaveSelect}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {step === "name" && (
        <div className="fb-modal-overlay">
          <div className="fb-modal" ref={nameModalRef}>
            <h3 className="fb-modal__title">Create Custom View</h3>
            <p className="fb-modal__subtitle">
              Give this column layout a name to save it as a view.
            </p>
            <input
              type="text"
              className="fb-modal__input"
              placeholder="e.g. Sanctioned Loans View"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              autoFocus
            />
            <div className="fb-modal__actions">
              <button
                type="button"
                className="fb-btn fb-btn--secondary"
                onClick={handleCancelName}
              >
                Cancel
              </button>
              <button
                type="button"
                className="fb-btn fb-btn--primary"
                onClick={handleSaveView}
                disabled={!viewName.trim()}
              >
                Save View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}