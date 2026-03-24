// import React from 'react';

// const ULIPComparisonModal = ({ isOpen, onClose }) => {
//   const handleClose = () => {
//     onClose();
//   };

//   const comparisonData = [
//     {
//       title: "Investment Option",
//       icon: "📅",
//       ulip: "Choice of multiple funds in the same investment plan. Asset classes available: equity, debt, Corporate debt & MMI.",
//       equityMF: "Investment in a single fund. Asset classes available: equity, debt, gold, commodities & MMI."
//     },
//     {
//       title: "Fund Management",
//       icon: "💼",
//       ulip: "Investment strategies available to automatically switch between funds according to the preference of investor. Free Fund switching & rebalancing in all plans.",
//       equityMF: "No Investment strategies. No free switching (exit charges - 1.5% applicable + Tax on profits earned)."
//     },
//     {
//       title: "Taxation Benefits",
//       icon: "💰",
//       ulip: "Tax Saving on Premium & Zero capital gain tax on Returns/maturity*.",
//       equityMF: "LTCG of 10% applicable on maturity amount."
//     },
//     {
//       title: "Yearly Returns",
//       icon: "📈",
//       ulip: "Average Return: 14% (Average of Lcap & Mcap category returns over 10 yrs).",
//       equityMF: "Average Return: 15% (Average of Lcap & Mcap category returns over 10 yrs)."
//     },
//     {
//       title: "Total Effective Charges",
//       icon: "💵",
//       ulip: "Cannot exceed 2.25% by IRDAI regulation.",
//       equityMF: "Cannot exceed 2.5% by SEBI regulation."
//     },
//     {
//       title: "Unfortunate demise",
//       icon: "⚰️",
//       ulip: "Insurance cover of 10X of annual premium is claimable, more benefits can be availed through additional riders.",
//       equityMF: "No insurance cover."
//     },
//     {
//       title: "Investment Transparency",
//       icon: "📊",
//       ulip: "Daily NAV tracking, Monthly fact sheet, Fund performance and portfolio info, Benchmark return info, Fund manager details.",
//       equityMF: "Daily NAV tracking, Monthly fact sheet, Fund performance and portfolio info, Benchmark return info, Fund manager details."
//     },
//     {
//       title: "Loyalty Benefits/Bonuses",
//       icon: "👑",
//       ulip: "Some plans offer extra benefits to investors for a long term investment.",
//       equityMF: "No Loyalty Benefits/Bonuses."
//     }
//   ];

//   const whenToULIP = [
//     "Looking for medium to long-term investment horizon",
//     "Want to grow wealth while securing family future",
//     "Have a low to medium risk appetite",
//     "Want to save on your taxes",
//     "Want less stress during market volatility"
//   ];

//   const whenToMF = [
//     "Looking for short to medium-term investment horizon",
//     "Want to only grow wealth",
//     "Have a high to medium risk appetite",
//     "Want high liquidity with no tax saving",
//     "Have knowledge & expertise to manage market volatility"
//   ];

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
//       <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div className="flex items-center gap-6 flex-1">
//             <div className="text-center flex-1">
//               <h3 className="text-2xl font-bold text-gray-900">ULIP</h3>
//               <p className="text-sm text-gray-600">Market linked Systematic investments managed by Insurance companies</p>
//             </div>
//             <div className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow-sm">
//               Saving money to grow money
//             </div>
//             <div className="text-center flex-1">
//               <h3 className="text-2xl font-bold text-gray-900">Equity MF</h3>
//               <p className="text-sm text-gray-600">Systematic investment options provided by Fund houses</p>
//             </div>
//           </div>
//           <button
//             onClick={handleClose}
//             className="text-gray-400 hover:text-gray-600 text-3xl font-bold ml-4"
//           >
//             ×
//           </button>
//         </div>

//         {/* Comparison Table */}
//         <div className="p-6">
//           <div className="space-y-4">
//             {comparisonData.map((item, index) => (
//               <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                 <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
//                   <div className="flex items-center gap-3">
//                     <span className="text-2xl">{item.icon}</span>
//                     <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2">
//                   <div className="p-4 border-r border-gray-200 bg-white">
//                     <p className="text-sm text-gray-700 leading-relaxed">{item.ulip}</p>
//                   </div>
//                   <div className="p-4 bg-white">
//                     <p className="text-sm text-gray-700 leading-relaxed">{item.equityMF}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* When to Section */}
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-green-50 rounded-lg p-6 border border-green-200">
//               <h4 className="font-bold text-green-800 mb-4 text-lg">When to ULIP</h4>
//               <ul className="space-y-3">
//                 {whenToULIP.map((item, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <span className="text-green-600 mt-1 text-lg">•</span>
//                     <span className="text-sm text-green-700 leading-relaxed">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
//               <h4 className="font-bold text-purple-800 mb-4 text-lg">When to Mutual Funds</h4>
//               <ul className="space-y-3">
//                 {whenToMF.map((item, index) => (
//                   <li key={index} className="flex items-start gap-3">
//                     <span className="text-purple-600 mt-1 text-lg">•</span>
//                     <span className="text-sm text-purple-700 leading-relaxed">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-gray-200 flex justify-center">
//           <button
//             onClick={handleClose}
//             className="bg-blue-600 text-white px-10 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
//           >
//             Okay, Got it!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ULIPComparisonModal;



import React from "react";

/** ULIP vs Equity MF – React (JS) + Tailwind */
export default function ULIPComparisonModal({ onClose = () => {}, onOk = () => {} }) {
  const cols = [
    { key: "ulip", title: "ULIP", sub: "Market linked Systematic investments managed by Insurance companies" },
    { key: "mf", title: "Equity MF", sub: "Systematic investment options provided by Fund houses" },
  ];

  const sections = [
    {
      icon: "📅",
      title: "Investment Option",
      rows: [
        {
          ulip:
            "Choice of multiple funds in the same investment plan. Asset classes available : equity, debt, Corporate debt & MMI",
          mf:
            "Investment in a single fund. Asset classes available : equity, debt, gold, commodities & MMI",
        },
      ],
    },
    {
      icon: "🧭",
      title: "Fund Management",
      rows: [
        {
          ulip:
            "Investment strategies available to automatically switch between funds according to the preference of investor",
          mf: "No Investment strategies",
        },
        {
          ulip: "Free Fund switching & rebalancing in all plans",
          mf: "No free switching (exit charges ~ 1.5% applicable + Tax on profits earned)",
        },
      ],
    },
    {
      icon: "🧾",
      title: "Taxation Benefits",
      rows: [
        {
          ulip: "Tax Saving on Premium & Zero capital gain tax on Returns/maturity*",
          mf: "LTCG of 10% applicable on maturity amount",
        },
      ],
    },
    {
      icon: "📈",
      title: "Yearly Returns",
      rows: [
        {
          ulip:
            "Average Return : 14% (Average of Lcap & Mcap category returns over 10 yrs)",
          mf:
            "Average Return : 15% (Average of Lcap & Mcap category returns over 10 yrs)",
        },
      ],
    },
    {
      icon: "💰",
      title: "Total Effective Charges",
      rows: [
        { ulip: "Cannot exceed 2.25% by IRDAI regulation", mf: "Cannot exceed 2.5% by SEBI regulation" },
      ],
    },
    {
      icon: "🕊️",
      title: "Unfortunate demise",
      rows: [
        {
          ulip:
            "Insurance cover of 10X of annual premium is claimable, more benefits can be availed through additional riders",
          mf: "No insurance cover",
        },
      ],
    },
    {
      icon: "🔎",
      title: "Investment Transparency",
      rows: [
        {
          ulip:
            [
              "Daily NAV tracking",
              "Monthly fact sheet",
              "Fund performance and portfolio info",
              "Benchmark return info",
              "Fund manager details",
            ].join(" • "),
          mf:
            [
              "Daily NAV tracking",
              "Monthly fact sheet",
              "Fund performance and portfolio info",
              "Benchmark return info",
              "Fund manager details",
            ].join(" • "),
        },
      ],
    },
    {
      icon: "🎁",
      title: "Loyalty Benefits/Bonuses",
      rows: [
        {
          ulip: "Some plans offer extra benefits to investors for a long term investment",
          mf: "No Loyalty Benefits/Bonuses",
        },
      ],
    },
  ];

  const whenTo = {
    ulip: [
      "Looking for medium to long‑term investment horizon",
      "Want to grow wealth while securing family future",
      "Have a low to medium risk appetite",
      "Want to save on your taxes",
      "Want less stress during market volatility",
    ],
    mf: [
      "Looking for short to medium‑term investment horizon",
      "Want to only grow wealth",
      "Have a high to medium risk appetite",
      "Want high liquidity with no tax saving",
      "Have knowledge & expertise to manage market volatility",
    ],
  };

  return (
    <div className="w-full h-full bg-white p-10">
      <div className="w-full h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4">
          <div className="grid w-full grid-cols-2 gap-4 text-center">
            {cols.map((c) => (
              <div key={c.key}>
                <div className="text-sm font-extrabold text-slate-800">{c.title}</div>
                <div className="mt-1 text-[11px] leading-snug text-slate-500">{c.sub}</div>
              </div>
            ))}
          </div>
          <div id="ulip-comparison-title" className="sr-only">ULIP vs Mutual Fund Comparison</div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Chip */}
        <div className="flex justify-center p-3">
          <div className="rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold text-emerald-700">
            Saving money to grow money
          </div>
        </div>

        {/* Sections */}
        {sections.map((sec, i) => (
          <div key={i} className="border-t border-slate-100">
            <div className="bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
              <span className="mr-2">{sec.icon}</span>
              {sec.title}
            </div>
            {sec.rows.map((r, idx) => (
              <Row key={idx} left={r.ulip} right={r.mf} />
            ))}
          </div>
        ))}

        {/* When to choose */}
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 grid grid-cols-2 text-center text-xs font-semibold text-slate-600">
            <div className="rounded-t-md bg-emerald-50 py-2 text-emerald-700">When to ULIP</div>
            <div className="rounded-t-md bg-indigo-50 py-2 text-indigo-700">When to Mutual Funds</div>
          </div>
          <div className="grid grid-cols-1 gap-0 rounded-b-md border border-slate-200 md:grid-cols-2">
            <ul className="space-y-2 p-4 text-sm text-slate-700">
              {whenTo.ulip.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 border-t border-slate-200 p-4 text-sm text-slate-700 md:border-l md:border-t-0">
              {whenTo.mf.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center p-5">
          <button
            onClick={onOk}
            className="w-40 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Okay, Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

/* Two‑column row */
function Row({ left, right }) {
  return (
    <div className="grid grid-cols-1 border-b border-slate-100 text-sm md:grid-cols-2">
      <div className="px-4 py-3 text-slate-700">{renderCell(left)}</div>
      <div className="border-t border-slate-100 px-4 py-3 text-slate-700 md:border-l md:border-t-0">
        {renderCell(right)}
      </div>
    </div>
  );
}

/* basic renderer for boolean/text */
function renderCell(v) {
  if (v === true)
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>Yes</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-200">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </span>
        <span>No</span>
      </span>
    );
  return <span>{v}</span>;
}
