import React, { useState } from "react";

export default function PlanBenefitsPopup({ isOpen, onClose, planData, onProceed, onCompareWithFDClick }) {
  const [activeTab, setActiveTab] = useState("benefits"); // "benefits" | "compare"

  // If not open, don't render anything
  if (!isOpen) return null;

  const handleProceedClick = () => {
    if (onProceed) {
      onProceed(planData);
    }
  };

  const handleCompareWithFDClick = () => {
    if (onCompareWithFDClick) {
      onCompareWithFDClick();
    }
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="pb-wrap">
            {/* close */}
            <button 
              className="close-btn" 
              aria-label="Close"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Tabs */}
            <div className="tabs">
              <button
                onClick={() => setActiveTab("benefits")}
                className={"tab" + (activeTab === "benefits" ? " active" : "")}
              >
                Plan Benefits
              </button>
              <button
                onClick={handleCompareWithFDClick}
                className={"tab" + (activeTab === "compare" ? " active" : "")}
              >
                Compare with FD
              </button>
            </div>

            {/* Title + Brand */}
            <div className="title-row">
              <div>
                <h1 className="title">Understand</h1>
                <h1 className="title dim">your plan</h1>
              </div>
              <div className="brand">
                {planData?.company || 'AEGON'}<span className="brand-lite">Life</span>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="card-grid">
              <div className="card soft-blue">
                <div className="icon">🔰</div>
                <div className="card-head">
                  <div className="rupee">₹25.3 L</div>
                  <div className="label">Life Cover</div>
                </div>
                <p className="small">
                  Inbuilt life cover to take care of your family even in your absence.
                </p>
              </div>

              <div className="card soft-yellow">
                <div className="icon">🏆</div>
                <div className="label strong">Tax Savings*</div>
                <p className="small left">
                  Save Upto ₹4.39 L<br />and Sec 10(10D)
                </p>
                <a className="link" href="#">View Details</a>
              </div>

              <div className="card soft-cyan">
                <div className="icon">🗓️</div>
                <div className="label strong">Guaranteed<br />Returns</div>
                <p className="small">
                  Get 100% guaranteed<br />tax‑free
                </p>
              </div>
            </div>

            {/* Benefit Timeline */}
            <div className="section">
              <div className="section-title">Benefit Timeline</div>

              {/* Highlight note */}
              <div className="note">
                <div className="bulb">💡</div>
                <div>
                  <div className="note-text">
                    You pay ₹20 K monthly for 5 Years and you get ₹18.6 Lacs as payout after 10 years.
                  </div>
                </div>
              </div>

              {/* Policy Start / Invest */}
              <div className="pill blue">Policy Start</div>
              <div className="panel invest">
                <div className="center">
                  <div className="muted">You Invest</div>
                  <div className="big">₹ 20 K <span className="muted small">/ month</span></div>
                  <div className="muted tiny">for 5 Years</div>
                </div>
                <div className="total right blue-badge">
                  <div className="tiny muted">Total</div>
                  <div className="total-amt">₹ 12 Lacs</div>
                </div>
              </div>

              {/* On 10th Year / You Get */}
              <div className="pill green">On 10th Year</div>
              <div className="panel get">
                <div className="center">
                  <div className="muted">You Get</div>
                  <div className="big">₹ 18.6 Lacs</div>
                  <div className="muted tiny">on 10th Year</div>
                </div>
                <div className="total right green-badge">
                  <div className="tiny muted">Total</div>
                  <div className="total-amt">₹ 18.6 Lacs</div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="bottom">
              <div className="bottom-left">
                <div className="tiny muted">Maturity Amount</div>
                <div className="row">
                  <div className="amount">₹18.6 L</div>
                  <span className="chip green">Tax Free</span>
                </div>
              </div>
              <button className="primary" onClick={handleProceedClick}>Proceed</button>
            </div>

            {/* Minimal CSS (scoped to this component) */}
            <style>{`
              .pb-wrap{
                max-width: 860px; margin: 0 auto; background:#fff; border-radius:18px;
                box-shadow:0 10px 30px rgba(0,0,0,.08); position:relative; overflow:hidden;
                padding-bottom:84px; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", sans-serif;
              }
              .close-btn{ position:absolute; left:14px; top:14px; width:34px; height:34px; border:none; background:#fff;
                border-radius:999px; color:#6b7280; cursor:pointer; z-index: 10; }
              .tabs{ display:flex; gap:10px; justify-content:center; padding:46px 12px 10px; }
              .tab{ background:#f3f4f6; border:none; padding:12px 18px; border-radius:12px; min-width:180px;
                color:#6b7280; cursor:pointer; font-weight:600; }
              .tab.active{ background:#fff; color:#111827; box-shadow:0 2px 12px rgba(0,0,0,.08); }
              .title-row{ display:flex; align-items:flex-start; justify-content:space-between; padding:6px 28px 0; }
              .title{ font-size:40px; line-height:1.05; margin:0; color:#111827; letter-spacing:.2px; }
              .title.dim{ color:#374151; margin-top:6px; }
              .brand{ font-weight:800; color:#111827; margin-top:8px; }
              .brand-lite{ font-weight:700; color:#2563eb; margin-left:4px; }
              .card-grid{ display:grid; grid-template-columns:repeat(3, 1fr); gap:18px; padding:22px 28px 8px; }
              .card{ border-radius:14px; padding:18px; min-height:170px; }
              .soft-blue{ background:#eef4ff; }
              .soft-yellow{ background:#fff6dc; }
              .soft-cyan{ background:#e9f6ff; }
              .icon{ font-size:22px; }
              .rupee{ font-weight:800; color:#111827; margin-top:6px; }
              .label{ color:#2563eb; font-weight:700; margin-top:2px; }
              .label.strong{ color:#1f2937; }
              .small{ font-size:12px; color:#6b7280; margin-top:10px; }
              .small.center{ text-align:center; }
              .link{ display:inline-block; margin-top:12px; color:#2563eb; font-weight:600; text-decoration:none; }
              .section{ padding:8px 28px 20px; }
              .section-title{ position:relative; color:#374151; font-weight:700; margin:22px 0 14px; }
              .section-title:after{ content:""; display:block; height:2px; background:#dbe3ff; margin-top:8px; }
              .note{ display:flex; align-items:flex-start; gap:10px; background:#e9f1ff; color:#1f2b6b; padding:12px 14px; border-radius:12px; border:1px solid #d7e2ff; }
              .bulb{ font-size:20px; line-height:1; }
              .note-text{ font-size:14px; font-weight:600; }
              .pill{ width:max-content; margin:18px auto 10px; padding:8px 18px; border-radius:999px; font-weight:700; color:#1f2937; }
              .pill.blue{ background:#e5edff; color:#2b4acb; }
              .pill.green{ background:#e8f6ea; color:#1b7a42; }
              .panel{ border-radius:14px; border:1px solid #e5e7eb; background:#fff; padding:20px; display:flex; align-items:center; justify-content:space-between; }
              .panel + .panel{ margin-top:14px; }
              .invest{ border-color:#cfe0ff; }
              .get{ border-color:#cfead4; }
              .center{ text-align:center; margin:0 auto; }
              .muted{ color:#6b7280; }
              .tiny{ font-size:12px; }
              .small{ font-size:12px; }
              .big{ font-size:22px; font-weight:800; color:#111827; }
              .right{ text-align:right; }
              .blue-badge{ background:#e9efff; border-radius:12px; padding:10px 12px; min-width:140px; }
              .green-badge{ background:#e9f7ee; border-radius:12px; padding:10px 12px; min-width:140px; }
              .total-amt{ font-weight:800; color:#111827; }
              .tiny.muted{ color:#6b7280; font-size:12px; }
              .bottom{
                position:sticky; bottom:0; left:0; right:0; background:#f9fafb; border-top:1px solid #e5e7eb;
                display:flex; align-items:center; justify-content:space-between; gap:16px; padding:12px 20px;
              }
              .bottom-left .row{ display:flex; align-items:center; gap:8px; }
              .amount{ font-weight:800; color:#111827; }
              .chip{ padding:3px 8px; border-radius:8px; font-size:11px; }
              .chip.green{ background:#e8faef; color:#1f7a4e; }
              .primary{
                background:#2563eb; color:#fff; border:none; padding:14px 26px; border-radius:12px; font-weight:700; cursor:pointer;
              }
              @media (max-width: 860px){
                .card-grid{ grid-template-columns:1fr; }
                .brand{ display:none; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}
