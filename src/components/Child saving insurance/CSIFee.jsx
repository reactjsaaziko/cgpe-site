import React, { useMemo, useState } from "react";

export default function CSIFee({
  yearNow = 2023,
  horizonYears = 1,          // years until goal (kept 1 to match mock)
  expectedReturn = 10,       // % yearly growth on savings (used for SIP math)
  onBack = () => {},
  onClose = () => {},
  onStart = () => {},
}) {
  const [editing, setEditing] = useState(false);
  const [feesLakh, setFeesLakh] = useState(25); // fees in ₹ Lakh for current year
  const [inflation, setInflation] = useState(4); // % per year

  // target fee after inflation
  const targetLakh = useMemo(() => {
    const f = feesLakh * Math.pow(1 + inflation / 100, horizonYears);
    return Number(f.toFixed(2));
  }, [feesLakh, inflation, horizonYears]);

  // monthly SIP needed to reach target in `horizonYears`
  const monthlyNeeded = useMemo(() => {
    const target = targetLakh * 100000; // convert Lakh -> ₹
    const n = horizonYears * 12;
    const i = expectedReturn / 100 / 12;
    // FV of SIP (end of month): M * [((1+i)^n - 1) / i] * (1 + i)
    const denom = (((Math.pow(1 + i, n) - 1) / i) * (1 + i)) || n; // fallback
    const M = target / denom;
    return Math.round(M); // ₹ / month
  }, [targetLakh, horizonYears, expectedReturn]);

  // helpers
  const inr = (v) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(v);
  const inrLakh = (v) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(v);

  const nextYear = yearNow + horizonYears;

  return (
    <div className="bg-white p-4 max-w-xl">
      <div className="mx-auto max-w-xl">
        {/* Header */} 
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Back"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <h1 className="text-center text-2xl font-bold text-slate-700">
            Child Savings Calculator
          </h1>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Close"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Current Fees row */}
        <div className="mt-2 text-center">
          <p className="text-slate-600">
            Current Fees in {yearNow}{" "}
            <span className="font-semibold">₹ {inrLakh(feesLakh)} lac</span>{" "}
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="ml-2 text-sm font-semibold text-blue-600"
              >
                Edit
              </button>
            ) : (
              <span className="ml-2 inline-flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  value={feesLakh}
                  onChange={(e) => setFeesLakh(Number(e.target.value || 0))}
                  className="w-24 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-slate-500"
                />
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white"
                >
                  Done
                </button>
              </span>
            )}
          </p>
        </div>

        {/* Inflation selector */}
        <div className="flex justify-center mt-6 text-center">
          <div className="mb-2 text-slate-700">College fees go up every year by</div>
          <div className="ml-4 items-center gap-2">
            <select
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="pl-4 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-slate-500"
            >
              {[3, 4, 5, 6, 7, 8, 10, 12].map((p) => (
                <option key={p} value={p}>
                  {p} %
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tiny bar illustration */}
        <div className="mt-10 grid place-items-center">
          <div className="relative flex items-end gap-24">
            {/* 2023 */}
            <div className="text-center">
              <div className="mb-1 text-sm font-semibold text-slate-700">
                ₹{inrLakh(feesLakh)} lac
              </div>
              <div className="relative h-52 w-10 rounded-md bg-blue-100">
                <div
                  className="absolute bottom-0 left-0 right-0 mx-auto w-10 rounded-md bg-blue-400"
                  style={{ height: `${(feesLakh / targetLakh) * 100}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-slate-500">{yearNow}</div>
            </div>

            {/* dotted line */}
            <div className="absolute left-10 right-10 top-6 h-0">
              <div className="h-0 border-t-2 border-dotted border-rose-400" />
            </div>

            {/* next year */}
            <div className="text-center">
              <div className="mb-1 text-sm font-semibold text-slate-700">
                ₹{inrLakh(targetLakh)} lac
              </div>
              <div className="relative h-52 w-10 rounded-md bg-blue-100">
                <div
                  className="absolute bottom-0 left-0 right-0 mx-auto w-10 rounded-md bg-blue-500"
                  style={{ height: "100%" }}
                />
              </div>
              <div className="mt-1 text-xs text-slate-500">{nextYear}</div>
            </div>
          </div>
        </div>

        {/* Result band */}
        <div className="mt-10 rounded-2xl bg-slate-100/70 p-6 text-center">
          <p className="text-slate-700">
            To reach this goal of{" "}
            <span className="font-semibold">₹ {inrLakh(targetLakh)} lac</span> you need to save
          </p>
          <div className="mt-3 text-3xl font-extrabold text-blue-700">
            ₹ {inr(monthlyNeeded)} <span className="text-base font-semibold text-slate-500">/month</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 grid place-items-center">
          <button
            onClick={() => onStart({ feesLakh, inflation, targetLakh, monthlyNeeded })}
            className="w-full max-w-xs rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
}
