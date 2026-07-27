import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import StatCard from "./StatCard";
import Badge from "./Badge";
import Button from "./Button";
import ColumnFilterPanel from "./ColumnFilterPanel";
import SavedViewDropdown from "./SavedViewDropdown";
import { DISBURSEMENT_ROWS } from "../data/mockData";

const STAT_TILES = [
  { label: "Total Disbursements", value: "8" },
  { label: "Total Disbursed Amount", value: "₹3,62,50,000" },
  { label: "Submitted", value: "12" },
  { label: "Verified", value: "1" },
  { label: "Processed", value: "5" },
  { label: "Audited", value: "12" },
];

const DEFAULT_VISIBLE = {
  "Disbursement Date": true,
  "Loan ID": true,
  "Applicant Name": true,
  "Bank Name": true,
  "Sanctioned Amt": true,
  "Disbursed Amt": true,
  "Credit Executive": true,
  Status: true,
};

export default function DisbursementPage({ onOpenLoan }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Saved views created via the "Save" -> "Create Custom View" flow
  const [savedViews, setSavedViews] = useState([]);

  // Pagination state — driven by actual row count, not hardcoded
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Simulate a data fetch when the page mounts
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRows(DISBURSEMENT_ROWS);
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));

  // Keep currentPage in range if rowsPerPage or row count changes
  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleColumn = (col) => {
    setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  const handleSavedViewApply = (view) => {
    // view can be a built-in name (string) or a saved-view object { name, columns }
    if (view && typeof view === "object" && view.columns) {
      setVisibleColumns(view.columns);
    } else {
      console.log("Applied saved view:", view);
    }
  };

  const handleCreateView = (name, columns) => {
    setSavedViews((prev) => [...prev, { name, columns }]);
  };

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Build a small window of page numbers around the current page
  const pageNumbers = [];
  for (let p = 1; p <= totalPages; p++) {
    if (
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 1 && p <= currentPage + 1)
    ) {
      pageNumbers.push(p);
    }
  }

  return (
    <div className="fb-page">
      <TopBar />

      <div className="fb-page__header">
        <div>
          <h1>Disbursement</h1>
          <div className="fb-breadcrumb">
            RMS <span>&gt;</span> <span className="fb-breadcrumb__active">Disbursement</span>
          </div>
        </div>
        <div className="fb-page__header-actions">
          <Button variant="outline" icon="clock">
            Activity
          </Button>
          <Button variant="outline" icon="upload">
            Import Excel
          </Button>
          <Button variant="primary">
            Add Disbursement <ion-icon name="chevron-down-outline" class="fb-sidebar__chevron"></ion-icon>
          </Button>
        </div>
      </div>

      <div className="fb-stat-row">
        {STAT_TILES.map((tile) => (
          <StatCard key={tile.label} label={tile.label} value={tile.value} />
        ))}
      </div>

      <div className="fb-card fb-table-card">
        <div className="fb-table-toolbar">
          <div className="fb-table-toolbar__search">
            <span className="fb-icon-search" />
            <input readOnly placeholder="Search for Disbursement" />
            <kbd>⌘K</kbd>
          </div>
          <div className="fb-table-toolbar__actions">
            <SavedViewDropdown
              savedViews={savedViews}
              onApply={handleSavedViewApply}
            />
            {/* <Button variant="outline">
              Export All <span className="fb-sidebar__chevron">⌄</span>
            </Button> */}
            <Button variant="outline">
              Export All <ion-icon name="chevron-down-outline" class="fb-sidebar__chevron"></ion-icon>
            </Button>
          </div>
        </div>

        <div className="fb-table-wrapper">
          <table className="fb-table">
            <thead>
              <tr>
                <th className="fb-table__checkbox-col">
                  <input type="checkbox" />
                </th>
                {visibleColumns["Disbursement Date"] && <th>Disbursement Date ⇕</th>}
                {visibleColumns["Loan ID"] && <th>Loan ID ⇕</th>}
                <th>Status ⇕</th>
                {visibleColumns["Applicant Name"] && <th>Applicant Name ⇕</th>}
                {visibleColumns["Bank Name"] && <th>Bank Name ⇕</th>}
                {visibleColumns["Sanctioned Amt"] && <th>Sanctioned Amt ⇕</th>}
                {visibleColumns["Disbursed Amt"] && <th>Verified ⇕</th>}
                <th>Referral % ⇕</th>
                {visibleColumns["Credit Executive"] && (
                  <th className="fb-table__filter-col">
                    Credit Executive ⇕
                    <button
                      className="fb-table__filter-btn"
                      onClick={() => setIsFilterOpen((prev) => !prev)}
                    >
                      ▤
                    </button>
                    <ColumnFilterPanel
                      isOpen={isFilterOpen}
                      onClose={() => setIsFilterOpen(false)}
                      visibleColumns={visibleColumns}
                      onApplyColumns={setVisibleColumns}
                      onCreateView={handleCreateView}
                    />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={10} className="fb-table__loading">
                    Loading disbursements…
                  </td>
                </tr>
              )}
              {!isLoading && paginatedRows.length === 0 && (
                <tr>
                  <td colSpan={10} className="fb-table__loading">
                    No disbursements found.
                  </td>
                </tr>
              )}
              {!isLoading &&
                paginatedRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    {visibleColumns["Disbursement Date"] && <td>{row.date}</td>}
                    {visibleColumns["Loan ID"] && (
                      <td>
                        <button
                          className="fb-link"
                          onClick={() => row.status === "Draft" && onOpenLoan(row)}
                        >
                          {row.id}
                        </button>
                      </td>
                    )}
                    <td>
                      <Badge status={row.status} />
                    </td>
                    {visibleColumns["Applicant Name"] && <td>{row.applicant}</td>}
                    {visibleColumns["Bank Name"] && <td>{row.bank}</td>}
                    {visibleColumns["Sanctioned Amt"] && <td>{row.sanctioned}</td>}
                    {visibleColumns["Disbursed Amt"] && <td>{row.disbursed}</td>}
                    <td>{row.referral}</td>
                    {visibleColumns["Credit Executive"] && (
                      <td>{row.creditExecutive || "-"}</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="fb-table-pagination">
          <span>Page</span>
          <input
            readOnly
            value={currentPage}
            className="fb-table-pagination__input"
          />
          <span>of {totalPages}</span>
          <span className="fb-table-pagination__divider">|</span>
          <span>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <div className="fb-table-pagination__nav">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
              «
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            {pageNumbers.map((p, idx) => {
              const prev = pageNumbers[idx - 1];
              const showEllipsis = prev !== undefined && p - prev > 1;
              return (
                <React.Fragment key={p}>
                  {showEllipsis && <span>…</span>}
                  <button
                    className={p === currentPage ? "active" : ""}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                </React.Fragment>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}