import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DisbursementPage from "./components/DisbursementPage";
import LoanDetailPage from "./components/LoanDetailPage";
import ActivityLogPanel from "./components/ActivityLogPanel";
import "./styles/finbowl.css";
export default function App() {
  const [view, setView] = useState("list");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);

  // Keep the browser tab title in sync with the current screen
  useEffect(() => {
    document.title =
      view === "list" ? "Disbursement · FinBowl" : `${selectedLoan?.applicant || "Loan"} · FinBowl`;
  }, [view, selectedLoan]);

  const handleOpenLoan = (row) => {
    setSelectedLoan(row);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedLoan(null);
  };

  const handleNavigate = (page, subPage) => {
    if (page === "RMS" && subPage === "Disbursement") {
      handleBackToList();
    }
  };

  return (
    <div className="fb-app">
      <Sidebar
        activePage="RMS"
        activeSubPage="Disbursement"
        onNavigate={handleNavigate}
      />

      <main className="fb-app__main">
        {view === "list" && <DisbursementPage onOpenLoan={handleOpenLoan} />}
        {view === "detail" && (
          <LoanDetailPage onOpenActivityLog={() => setIsActivityLogOpen(true)} />
        )}
      </main>

      <ActivityLogPanel
        isOpen={isActivityLogOpen}
        onClose={() => setIsActivityLogOpen(false)}
      />
    </div>
  );
}