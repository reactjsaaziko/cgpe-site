import React, { useState } from "react";

export default function CompareWithFDPopup({ isOpen, onClose, planData, onPlanBenefitsClick, onProceed }) {
  const [activeTab, setActiveTab] = useState("compare"); // "benefits" | "compare"
  const [taxSlab, setTaxSlab] = useState(20); // 10 | 20 | 30

  const taxAfterMap = { 10: 5.85, 20: 5.2, 30: 4.55 };

  // If not open, don't render anything
  if (!isOpen) return null;

  const handlePlanBenefitsClick = () => {
    if (onPlanBenefitsClick) {
      onPlanBenefitsClick();
    }
  };

  const handleProceedClick = () => {
    if (onProceed) {
      onProceed(planData);
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
        <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="cmp-wrap">
            {/* close */}
            <button 
              className="close-btn" 
              aria-label="Close"
              onClick={onClose}
            >
              ✕
            </button>

            {/* tabs */}
            <div className="tabs">
              <button
                className={"tab" + (activeTab === "benefits" ? " active" : "")}
                onClick={handlePlanBenefitsClick}
              >
                Plan Benefits
              </button>
              <button
                className={"tab" + (activeTab === "compare" ? " active" : "")}
                onClick={() => setActiveTab("compare")}
              >
                Compare with FD
              </button>
            </div>

            {/* headers */}
            <div className="bars">
              <div className="bar left">iGuarantee Max Savings</div>
              <div className="vs">vs</div>
              <div className="bar right">Fixed Deposits</div>
            </div>

            {/* investment */}
            <div className="center">
              <div className="sub">Your Investment Over 5 Years</div>
              <div className="amount blue">₹ 12 Lacs</div>
            </div>

            {/* Returns You Get */}
            <Section title="Returns You Get">
              <TwoCol
                left={
                  <Rate rate="5.9%" badge={{ text: "Tax Free", tone: "green" }} />
                }
                right={<Rate rate="6.5%" badge={{ text: "Taxable", tone: "rose" }} />}
              />
            </Section>

            {/* Returns After Tax */}
            <Section title="Returns After Tax">
              <TwoCol
                left={<Rate rate="5.9%" />}
                right={
                  <div className="tax-slab-grid">
                    {[10, 20, 30].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTaxSlab(t)}
                        className={
                          "tax-slab" + (taxSlab === t ? " selected" : "")
                        }
                      >
                        <div className="rate-big">{taxAfterMap[t].toFixed(2)}%</div>
                        <div className="tax-sublabel">
                          <span className="muted">Tax Slab</span>
                          <span>{t}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                }
              />
            </Section>

            {/* In Case Of Death */}
            <Section title="In Case Of Death Your Family Gets">
              <TwoCol
                left={<div className="rate-big">25.3 L</div>}
                right={<div className="muted">Zero</div>}
              />
            </Section>

            {/* bottom bar */}
            <div className="bottom">
              <div>
                <div className="sub">Maturity Amount</div>
                <div className="row">
                  <div className="amount">₹18.6 L</div>
                  <span className="badge green">Tax Free</span>
                </div>
              </div>
              <button className="primary" onClick={handleProceedClick}>Proceed</button>
            </div>

            {/* minimal CSS */}
            <style>{`
              .cmp-wrap{
                max-width:520px; margin:24px auto; background:#fff; border-radius:16px;
                box-shadow:0 10px 30px rgba(0,0,0,.08); position:relative; overflow:hidden;
                font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Helvetica Neue", sans-serif;
              }
              .close-btn{
                position:absolute; left:10px; top:10px; width:32px; height:32px; border:none; background:#fff;
                border-radius:999px; color:#6b7280; cursor:pointer;
              }
              .tabs{ display:flex; gap:8px; padding:48px 16px 0; justify-content:center; }
              .tab{
                flex:0 0 auto; background:#f3f4f6; border:none; padding:10px 16px; border-radius:10px;
                color:#6b7280; cursor:pointer; font-size:14px; min-width:160px;
              }
              .tab.active{ background:#fff; color:#111827; box-shadow:0 2px 10px rgba(0,0,0,.08); }
              .bars{ display:grid; grid-template-columns:1fr 48px 1fr; align-items:center; gap:8px; padding:16px; }
              .bar{
                text-align:center; padding:10px; border-radius:10px; font-weight:600; font-size:14px;
              }
              .bar.left{ background:#e9f8ea; color:#0f5132; }
              .bar.right{ background:#f5e5e3; color:#7a2b24; }
              .vs{
                background:#fff; border:1px solid #e5e7eb; color:#6b7280; width:32px; height:32px;
                display:flex; align-items:center; justify-content:center; border-radius:999px; margin:0 auto;
              }
              .center{ text-align:center; padding:0 16px 6px; }
              .sub{ font-size:12px; color:#6b7280; }
              .amount{ font-weight:700; color:#111827; margin-top:4px; }
              .blue{ color:#2563eb; }
              .section{ padding:8px 16px 0; }
              .section-title{
                background:#f3f4f6; color:#6b7280; font-weight:600; font-size:12px; text-align:center;
                padding:8px; border-radius:8px;
              }
              .two-col{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:10px; }
              .card{ border:1px solid #e5e7eb; border-radius:12px; padding:16px; text-align:center; }
              .rate{ font-size:18px; font-weight:700; color:#111827; }
              .badge{
                font-size:10px; padding:3px 8px; border-radius:8px; margin-top:6px; display:inline-block;
              }
              .badge.green{ background:#e8faef; color:#1f7a4e; }
              .badge.rose{ background:#fde8e6; color:#a83a32; }
              .muted{ color:#6b7280; }
              .rate-big{ font-size:18px; font-weight:700; color:#111827; }
              .tax-slab-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:8px; width:100%; }
              .tax-slab{
                border:1px solid #e5e7eb; border-radius:12px; padding:10px 6px; background:#fff; cursor:pointer;
              }
              .tax-slab.selected{ border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.12); }
              .tax-sublabel{ display:flex; align-items:center; justify-content:space-between; margin-top:2px; font-size:11px; }
              .bottom{
                display:flex; align-items:center; justify-content:space-between; gap:12px;
                border-top:1px solid #e5e7eb; background:#f9fafb; padding:12px 16px; margin-top:14px;
              }
              .row{ display:flex; align-items:center; gap:8px; }
              .primary{
                background:#2563eb; color:#fff; border:none; padding:12px 20px; border-radius:10px;
                font-weight:600; cursor:pointer;
              }
              @media (max-width: 420px){
                .tax-slab-grid{ grid-template-columns:1fr; }
                .two-col{ grid-template-columns:1fr; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- tiny helpers as plain functions/components ---------- */

function Section(props) {
  return (
    <div className="section">
      <div className="section-title">{props.title}</div>
      <div className="two-col">{props.children}</div>
    </div>
  );
}

function TwoCol(props) {
  return (
    <>
      <div className="card">{props.left}</div>
      <div className="card">{props.right}</div>
    </>
  );
}

function Rate(props) {
  return (
    <div>
      <div className="rate">{props.rate}</div>
      {props.badge ? (
        <span className={"badge " + (props.badge.tone === "green" ? "green" : "rose")}>
          {props.badge.text}
        </span>
      ) : null}
    </div>
  );
}
