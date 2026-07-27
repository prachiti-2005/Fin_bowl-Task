import React, { useState } from "react";
import TopBar from "./TopBar";
import StatCard from "./StatCard";
import Badge from "./Badge";
import Button from "./Button";
import { LOAN_DETAIL } from "../data/mockData";

const SECTIONS = [
  "Applicant Information",
  "Loan Details",
  "Disbursements Information",
  "Commission",
  "Broker Infromation",
  "Additional Information",
];

function Section({ title, icon, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="fb-card fb-section">
      <button className="fb-section__header" onClick={() => setIsOpen((v) => !v)}>
        <span className="fb-section__title">
          {icon} {title}
        </span>
        <span className={`fb-sidebar__chevron ${isOpen ? "fb-sidebar__chevron--open" : ""}`}>
          <ion-icon name="chevron-up-outline"></ion-icon>
        </span>
      </button>
      {isOpen && <div className="fb-section__body">{children}</div>}
    </div>
  );
}

export default function LoanDetailPage({ onOpenActivityLog }) {
  const [activeNav, setActiveNav] = useState(SECTIONS[0]);
  const data = LOAN_DETAIL;

  return (
    <div className="fb-page">
      <TopBar />

      <div className="fb-page__header">
        <div>
          <h1>{data.loanId}</h1>
          <div className="fb-breadcrumb">
            RMS <span>&gt;</span> Disbursement <span>&gt;</span>{" "}
            <span className="fb-breadcrumb__active">{data.applicant}</span>
          </div>
        </div>
        <div className="fb-page__header-actions">
          <Button variant="outline" icon="archive">
            Archive
          </Button>
          <Button variant="outline" icon="clock" onClick={onOpenActivityLog}>
            Activity Logs
          </Button>
          <Button variant="primary" icon="edit">
            Edit Loan
          </Button>
        </div>
      </div>

      <div className="fb-loan-title-row">
        <div>
          <div className="fb-loan-title-row__name">
            {data.applicant} <Badge status={data.status} />
          </div>
          <div className="fb-loan-title-row__subtitle">{data.type}</div>
        </div>
      </div>

      <div className="fb-stat-row">
        {data.stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} highlight={s.highlight} />
        ))}
      </div>

      <div className="fb-loan-layout">
        <nav className="fb-loan-nav">
          {SECTIONS.map((s) => (
            <button
              key={s}
              className={`fb-loan-nav__item ${activeNav === s ? "fb-loan-nav__item--active" : ""}`}
              onClick={() => setActiveNav(s)}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="fb-loan-content">
          <Section title="Applicant Information" icon={<ion-icon name="person-outline"></ion-icon>}>
            <table className="fb-table fb-table--plain">
              <thead>
                <tr>
                  <th>Name <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Type <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Email ID <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Phone Number <ion-icon name="swap-vertical-outline"></ion-icon></th>
                </tr>
              </thead>
              <tbody>
                {data.applicants.map((a) => (
                  <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>
                      <span className="fb-tag">{a.type}</span>
                    </td>
                    <td>{a.email}</td>
                    <td>{a.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Loan Details" icon={<ion-icon name="business-outline"></ion-icon>}>
            <div className="fb-loan-details-grid">
              <div>
                <div className="fb-field-label">Loan ID</div>
                <div className="fb-field-value">{data.loanDetails.loanId}</div>
              </div>
              <div>
                <div className="fb-field-label">Loan Type</div>
                <span className="fb-tag">{data.loanDetails.loanType}</span>
              </div>
              <div>
                <div className="fb-field-label">Bank</div>
                <div className="fb-field-value">{data.loanDetails.bank}</div>
              </div>
              <div>
                <div className="fb-field-label">Stage</div>
                <div className="fb-field-value">{data.loanDetails.stage}</div>
              </div>
            </div>

            <div className="fb-field-label fb-field-label--section">Sanction Details:</div>
            <div className="fb-loan-details-grid">
              <div>
                <div className="fb-field-label">Sanctioned Date</div>
                <div className="fb-field-value">{data.loanDetails.sanctionedDate}</div>
              </div>
              <div>
                <div className="fb-field-label">Loan Sanctioned Amount</div>
                <div className="fb-field-value fb-field-value--green">
                  {data.loanDetails.sanctionedAmount}
                </div>
              </div>
              <div>
                <div className="fb-field-label">Verified Sanctioned Amount</div>
                <div className="fb-field-value fb-field-value--green">
                  {data.loanDetails.verifiedSanctionedAmount}
                </div>
              </div>
            </div>

            <div className="fb-field-label fb-field-label--section">Team Details:</div>
            <div className="fb-loan-details-grid">
              <div>
                <div className="fb-field-label">Bank Executive Name</div>
                <div className="fb-field-value">{data.loanDetails.bankExecutive}</div>
              </div>
              <div>
                <div className="fb-field-label">Credit Executive Details</div>
                <div className="fb-field-value">{data.loanDetails.creditExecutive}</div>
              </div>
              <div>
                <div className="fb-field-label">Source</div>
                <div className="fb-field-value">{data.loanDetails.source}</div>
              </div>
            </div>
          </Section>

          <Section title="Disbursements Information" icon={<ion-icon name="link-outline"></ion-icon>}>
            <table className="fb-table fb-table--plain">
              <thead>
                <tr>
                  <th>Disbursement ID <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Disbursement Date <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Disbursement Amount <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Verified Disbursement Amount <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>UTR Number <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Tranche <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Disbursement Status <ion-icon name="swap-vertical-outline"></ion-icon></th>
                </tr>
              </thead>
              <tbody>
                {data.disbursements.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.date}</td>
                    <td className={d.amount !== d.verified ? "fb-text--red" : "fb-text--green"}>
                      {d.amount}
                    </td>
                    <td className={d.amount !== d.verified ? "fb-text--red" : "fb-text--green"}>
                      {d.verified}
                    </td>
                    <td>{d.utr}</td>
                    <td>{d.tranche}</td>
                    <td>
                      <span className="fb-badge fb-badge--amber">{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section
            title={
              <>
                Commission <span className="fb-pill">Total Commission : {data.commissionTotal}</span>
              </>
            }
            icon={<ion-icon name="link-outline"></ion-icon>}
          >
            <table className="fb-table fb-table--plain">
              <thead>
                <tr>
                  <th>Party Name (Used Code) <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Sub-Code Commission (Net)% <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Gross Commission % <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Commission Amount <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Invoice No <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Invoice Status <ion-icon name="swap-vertical-outline"></ion-icon></th>
                </tr>
              </thead>
              <tbody>
                {data.commission.map((c, i) => (
                  <tr key={i}>
                    <td>{c.party}</td>
                    <td>{c.subCode}</td>
                    <td>{c.gross}</td>
                    <td className="fb-text--green">{c.amount}</td>
                    <td>
                      <button className="fb-link">{c.invoice}</button>
                    </td>
                    <td>
                      <Badge status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section
            title={
              <>
                Broker Infromation{" "}
                <span className="fb-pill fb-pill--pink">Total Referral Fee: {data.referralFeeTotal}</span>
              </>
            }
            icon={<ion-icon name="people-outline"></ion-icon>}
          >
            <table className="fb-table fb-table--plain">
              <thead>
                <tr>
                  <th>Broker Name / Code <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Broker Commission % <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>Referral Fee <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>PO No & Date <ion-icon name="swap-vertical-outline"></ion-icon></th>
                  <th>PO Status <ion-icon name="swap-vertical-outline"></ion-icon></th>
                </tr>
              </thead>
              <tbody>
                {data.brokers.map((b, i) => (
                  <tr key={i}>
                    <td>
                      {b.name}
                      <br />
                      {b.code} <span className="fb-tag">{b.tag}</span>
                    </td>
                    <td>{b.commission}</td>
                    <td>{b.referral}</td>
                    <td>
                      <button className="fb-link">{b.po}</button> {b.date}
                    </td>
                    <td>
                      <Badge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Notes / Additional Information" icon={<ion-icon name="document-text-outline"></ion-icon>}>
            <p className="fb-notes">{data.notes}</p>
          </Section>

          <Section title="Documents" icon={<ion-icon name="document-text-outline"></ion-icon>}>
            <div className="fb-documents-row">
              {data.documents.map((doc, i) => (
                <div key={i} className="fb-document-chip">
                  <span className="fb-document-chip__icon">PDF</span>
                  <div>
                    <div>{doc.name}</div>
                    <div className="fb-document-chip__size">{doc.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}