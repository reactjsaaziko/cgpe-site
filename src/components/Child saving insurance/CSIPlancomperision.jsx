import React from "react";

export default function CSIPlancomperision({ onPlanNow = () => {} }) {
  const cols = [
    { key: "csp", title: "Child Savings Plan" },
    { key: "ssy", title: "Sukanya Samriddhi Yojana Scheme" },
    { key: "ppf", title: "Public Provident Fund" },
  ];

  const rows = [
    { type: "group", label: "Unique Triple Benefit" },
    {
      label: "Future premiums paid by insurer on parent’s death",
      csp: true, ssy: false, ppf: false,
    },
    {
      label: "Monthly income to fund child’s education on parent’s death",
      csp: true, ssy: false, ppf: false,
    },
    {
      label: "Lumpsum payout to family on parent’s death",
      csp: true, ssy: false, ppf: false,
    },

    { type: "group", label: "Returns" },
    {
      label: "Return as of May 2023",
      csp: "11%–14%", ssy: "8%", ppf: "7.1%",
    },

    { type: "group", label: "Availability" },
    {
      label: "Availability",
      csp: "Girl Child or Boy Child",
      ssy: "Girl child only",
      ppf: "Girl Child or Boy Child",
    },
    {
      label: "Max Entry Age",
      csp: "Upto 54 years",
      ssy: "Upto 10 years",
      ppf: "No Age Limit",
    },

    { type: "group", label: "Flexibility" },
    {
      label: "Invested Amount can be withdrawn after",
      csp: "5 Years",
      ssy: "21 Years",
      ppf: "15 Years",
    },
    {
      label: "Conditions for Premature closure",
      csp: "Anytime after 5 years",
      ssy: "Extreme Compassionate Grounds",
      ppf: "Serious Ailments or for education",
    },
    {
      label: "Penalty on premature Closure",
      csp: "No penalty after 5 years",
      ssy: "Returns reduced to post office savings rate",
      ppf: "1% reduction in interest rate",
    },
    {
      label: "Max deposit amount in an year",
      csp: "No Limit",
      ssy: "1.5 Lacs",
      ppf: "1.5 Lacs",
    },

    { type: "group", label: "Documentation" },
    {
      label: "Documentation Required for Withdrawal",
      csp: "Low", ssy: "High", ppf: "Low",
    },
  ];

  return (
    <div className="max-h-screen bg-white p-4 md:p-6">
      <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Sticky header band */}
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="w-2/5 px-3 py-4 text-left text-xs font-semibold text-slate-500">Features</th>
                {cols.map((c) => (
                  <th key={c.key} className="px-3 py-4 text-center text-xs font-semibold text-slate-600">
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) =>
                r.type === "group" ? (
                  <tr key={idx} className="bg-indigo-50/60">
                    <td className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-indigo-700">
                      {r.label}
                    </td>
                    <td colSpan={cols.length} className="px-3 py-2" />
                  </tr>
                ) : (
                  <tr key={idx} className="border-t border-slate-100">
                    <td className="px-3 py-4 text-sm text-slate-700">{r.label}</td>
                    {cols.map((c) => (
                      <td key={c.key} className="px-3 py-4 text-center">
                        <Cell value={r[c.key]} />
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="border-t border-slate-200 p-4">
          <div className="grid place-items-center">
            <button
              onClick={onPlanNow}
              className="w-48 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Plan Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Single cell renderer: check/cross for booleans, text otherwise --- */
function Cell({ value }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  return <span className="text-sm text-slate-700">{value}</span>;
}

/* --- Tiny inline icons --- */
function CheckIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function CrossIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-200">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      </svg>
    </span>
  );
}
