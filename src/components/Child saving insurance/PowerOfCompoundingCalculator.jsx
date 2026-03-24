import React, { useMemo, useState } from "react";

/** Tailwind UI + plain JS logic */
export default function PowerOfCompoundingCalculator({ isOpen, onClose }) {
  const [mode, setMode] = useState("monthly"); // 'onetime' | 'monthly' | 'yearly'
  const [amount, setAmount] = useState(12500);  // input amount (₹)
  const [investFor, setInvestFor] = useState(5); // yrs contributing
  const [stayFor, setStayFor] = useState(20);    // total yrs invested
  const [rate, setRate] = useState(8);           // % per year

  const marks = [0,5,10,15,20,25,30,35,40];

  // ----- math helpers -----
  const fmtINR = (n) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(n);

  const futureValue = (years) => {
    const r = rate / 100;
    if (mode === "onetime") {
      // lump sum at t=0, stays for 'years'
      return amount * Math.pow(1 + r, years);
    }
    if (mode === "yearly") {
      const n = Math.min(investFor, years);
      // end-of-year contributions (ordinary annuity)
      const fvContrib = amount * ((Math.pow(1 + r, n) - 1) / r);
      // grow further for remaining years
      const extra = Math.max(years - n, 0);
      return fvContrib * Math.pow(1 + r, extra);
    }
    // monthly SIP
    const i = r / 12;
    const n = Math.min(investFor, years) * 12;
    const fvSip = amount * (((Math.pow(1 + i, n) - 1) / i) * (1 + i)); // end of each month
    const extraMonths = Math.max(years - Math.min(investFor, years), 0) * 12;
    return fvSip * Math.pow(1 + i, extraMonths);
  };

  const investedTotal = useMemo(() => {
    if (mode === "onetime") return amount;
    if (mode === "yearly") return amount * investFor;
    return amount * 12 * investFor; // monthly
  }, [mode, amount, investFor]);

  const finalAmount = useMemo(() => futureValue(stayFor), [mode, amount, rate, investFor, stayFor]);

  // bars for 5/10/15/20 yr snapshots
  const barYears = [5, 10, 15, 20];
  const barValues = barYears.map((y) => futureValue(y));
  const maxBar = Math.max(...barValues);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Power of Compounding Calculator</h2>
            <p className="text-sm text-gray-600 mt-1">"Compound interest is the eighth wonder of the world." - Albert Einstein</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* LEFT */}
            <div>
              {/* Tabs */}
              <div className="mb-4 flex gap-3">
                <Tab active={mode === "onetime"} onClick={() => setMode("onetime")}>One Time</Tab>
                <Tab active={mode === "monthly"} onClick={() => setMode("monthly")}>Monthly</Tab>
                <Tab active={mode === "yearly"} onClick={() => setMode("yearly")}>Yearly</Tab>
              </div>

              {/* Amount input */}
              <label className="block text-sm font-semibold text-slate-700">
                Amount I wish to Invest
              </label>
              <div className="mt-2 flex items-center gap-2">
                <div className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-lg font-bold text-slate-500">
                  ₹
                </div>
                <input
                  type="number"
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 text-lg outline-none focus:border-slate-400"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value || 0)))}
                />
              </div>
              <div className="mt-2 text-xs text-slate-500">• {toWordsIN(amount)}</div>

              {/* Invest For */}
              <SliderBlock
                label="Invest For"
                unit="Years"
                value={investFor}
                onChange={setInvestFor}
                min={0}
                max={40}
                step={1}
                marks={marks}
              />

              {/* Stay Invested For */}
              <SliderBlock
                label="Stay invested for"
                unit="Years"
                value={stayFor}
                onChange={setStayFor}
                min={0}
                max={40}
                step={1}
                marks={marks}
              />

              {/* Expected Rate */}
              <SliderBlock
                label="Expected rate of return"
                unit="% /Year"
                value={rate}
                onChange={setRate}
                min={1}
                max={25}
                step={0.5}
                marks={[0,5,10,15,20,25]}
              />
            </div>

            {/* RIGHT */}
            <div className="flex flex-col justify-between">
              {/* Bars */}
              <div className="grid grid-cols-4 gap-6 px-2 pt-4">
                {barYears.map((y, idx) => {
                  const v = barValues[idx];
                  const h = Math.max(8, (v / maxBar) * 180);
                  return (
                    <div key={y} className="flex flex-col items-center">
                      <div className="mb-2 text-xs text-slate-500">₹{fmtINR(v / 100000)} L</div>
                      <div className="flex h-56 w-16 flex-col justify-end rounded-lg bg-slate-100">
                        <div
                          className="mx-2 mb-2 rounded-md bg-emerald-500"
                          style={{ height: `${h}px` }}
                          title={`₹ ${fmtINR(v)}`}
                        />
                      </div>
                      <div className="mt-1 text-xs text-slate-600">In {y} Yr</div>
                    </div>
                  );
                })}
              </div>

              {/* Summary cards */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SummaryCard
                  title="YOU INVEST"
                  value={`₹${fmtINR(investedTotal / 100000)} L`}
                  sub={
                    mode === "monthly"
                      ? `Over ${investFor} Years`
                      : mode === "yearly"
                      ? `Over ${investFor} Years`
                      : "One Time"
                  }
                  color="indigo"
                />
                <SummaryCard
                  title="YOU GET"
                  value={`₹${fmtINR(finalAmount / 100000)} L`}
                  sub={`After ${stayFor} Years`}
                  color="emerald"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI atoms ---------- */

function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold ${
        active
          ? "bg-blue-600 text-white"
          : "border border-slate-200 text-slate-700 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function SliderBlock({ label, unit, value, onChange, min, max, step, marks }) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-700">{label} <span className="text-xs text-slate-400">(in Years)</span></div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1 text-sm">
          <span className="font-semibold w-8 text-center">{value.toString().padStart(2, "0")}</span>
          <span className="text-slate-400">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range accent-blue-500 w-full"
      />
      {/* Ticks */}
      <div className="relative mt-2 h-4">
        <div className="absolute inset-x-0 top-2 flex justify-between px-1">
          {marks.map((m) => (
            <div key={m} className="text-[10px] text-slate-500">{m}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, sub, color = "indigo" }) {
  const palette = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
  }[color];
  return (
    <div className={`rounded-xl ${palette} p-5 text-white shadow-lg`}>
      <div className="text-xs font-semibold tracking-wider opacity-90">{title}</div>
      <div className="mt-2 text-3xl font-extrabold">{value}</div>
      <div className="mt-2 text-xs opacity-90">{sub}</div>
    </div>
  );
}

/* ---------- tiny helper to say number in Indian words (simple) ---------- */
function toWordsIN(n) {
  // very small helper, enough for UI hint
  try {
    const lakh = 100000;
    if (n >= lakh) return `${(n / lakh).toFixed(2)} Lakh`;
    const thousand = 1000;
    if (n >= thousand) return `${(n / thousand).toFixed(2)} Thousand`;
    return String(n);
  } catch {
    return String(n);
  }
}
