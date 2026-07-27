
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

export default function ColumnFilterPanel({
  isOpen,
  onClose,
  visibleColumns,
  onApplyColumns,
  onCreateView,
}) {
  const panelRef = useRef(null);
  const nameModalRef = useRef(null);

  const [draftColumns, setDraftColumns] = useState(visibleColumns || {});
  const [step, setStep] = useState("select"); // "select" | "name"
  const [viewName, setViewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDraftColumns(visibleColumns || {});
      setStep("select");
      setViewName("");
      setIsSaving(false);
    }
  }, [isOpen, visibleColumns]);

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
    setStep("name");
  };

  const handleCancelName = () => {
    setStep("select");
  };

  const handleSaveView = () => {
    const trimmedName = viewName.trim();
    if (!trimmedName || isSaving) return;

    setIsSaving(true);

    // Simulated async save. Swap the setTimeout for a real await
    // if onCreateView ever talks to a backend.
    setTimeout(() => {
      onApplyColumns?.(draftColumns);
      onCreateView?.(trimmedName, draftColumns);

      setIsSaving(false);
      setStep("select");
      setViewName("");
      onClose();
    }, 800);
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
              disabled={isSaving}
            />
            <div className="fb-modal__actions">
              <button
                type="button"
                className="fb-btn fb-btn--secondary"
                onClick={handleCancelName}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="button"
                className="fb-btn fb-btn--primary"
                onClick={handleSaveView}
                disabled={!viewName.trim() || isSaving}
              >
                {isSaving ? (
                  <>
                    <ion-icon name="reload-outline" className="fb-spin"></ion-icon>
                    Saving...
                  </>
                ) : (
                  "Save View"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
