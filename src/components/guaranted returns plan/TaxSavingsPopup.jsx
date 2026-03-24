import React from "react";

/**
 * TaxSavingPopup
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 */
export default function TaxSavingPopup({ open = true, onClose = () => {} }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[480px] rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            {/* Logo (placeholder – replace src with real) */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/82/Max_Life_Insurance_logo.png"
              alt="Max Life"
              className="h-6 object-contain"
            />
          </div>
          <button
            onClick={() => onClose()}
            aria-label="Close"
            className="h-8 w-8 grid place-items-center rounded-full hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <div className="px-4 pt-3 pb-2 text-center">
          <h3 className="text-[15px] font-semibold text-slate-800">
            Save Tax on your Investment
          </h3>
        </div>

        {/* Under Sec 80C */}
        <div className="px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2e6bff] text-white text-[12px] font-semibold px-3 py-1">
            Under Sec 80C
          </div>

          {/* Header row */}
          <div className="mt-2 grid grid-cols-2 text-[12px] font-semibold text-slate-600 rounded-t-lg bg-slate-50 border border-slate-200">
            <div className="px-4 py-2 border-r border-slate-200">Amount invested</div>
            <div className="px-4 py-2">Tax Saved on Investment</div>
          </div>

          {/* Row 1: In 1st Year */}
          <div className="grid grid-cols-2 text-[13px] border-x border-b border-slate-200">
            <div className="px-4 py-3 border-r border-slate-200">
              <div className="text-slate-500 text-[12px]">In 1st Year</div>
              <div className="mt-1 font-semibold text-slate-800">₹ 2.4 L</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-semibold text-emerald-600">₹ 46.8 K*</div>
              <button className="text-[11px] text-blue-600 underline">
                How this is calculated ?
              </button>
            </div>
          </div>

          {/* Row 2: Over 5 Years */}
          <div className="grid grid-cols-2 text-[13px] border-x border-b border-slate-200 rounded-b-lg">
            <div className="px-4 py-3 border-r border-slate-200">
              <div className="text-slate-500 text-[12px]">Over 5 Years</div>
              <div className="mt-1 font-semibold text-slate-800">₹ 12 L</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-semibold text-emerald-600">₹ 2.34 L*</div>
            </div>
          </div>
        </div>

        {/* Under Sec 10(10D) */}
        <div className="px-4 mt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2e6bff] text-white text-[12px] font-semibold px-3 py-1">
            Under Sec 10(10D)
          </div>

          {/* Header row */}
          <div className="mt-2 grid grid-cols-2 text-[12px] font-semibold text-slate-600 rounded-t-lg bg-slate-50 border border-slate-200">
            <div className="px-4 py-2 border-r border-slate-200">Maturity Value</div>
            <div className="px-4 py-2">Tax on Returns</div>
          </div>

          {/* Guaranteed Return */}
          <div className="grid grid-cols-2 text-[13px] border-x border-b border-slate-200">
            <div className="px-4 py-3 border-r border-slate-200">
              <div className="text-slate-500 text-[12px]">Guaranteed Return</div>
              <div className="mt-1 font-semibold text-slate-800">₹20.5 L</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-semibold text-emerald-600">No Tax*</div>
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center justify-center my-2">
            <div className="h-9 w-9 grid place-items-center rounded-full border border-slate-300 bg-white text-[12px] font-semibold text-slate-600">
              VS
            </div>
          </div>

          {/* Fixed Deposit */}
          <div className="grid grid-cols-2 text-[13px] border border-rose-200 rounded-lg bg-rose-50">
            <div className="px-4 py-3 border-r border-rose-200">
              <div className="text-slate-500 text-[12px]">Fixed Deposit</div>
              <div className="mt-1 font-semibold text-slate-800">₹20.5 L</div>
            </div>
            <div className="px-4 py-3">
              <div className="font-semibold text-rose-600">₹ 2,67 L Tax</div>
              <button className="text-[11px] text-blue-600 underline">
                How this is calculated ?
              </button>
            </div>
          </div>
        </div>

        {/* Policybazaar strip */}
        <div className="mx-4 mt-4 rounded-lg bg-emerald-50 text-emerald-700 text-[12px] px-3 py-2 border border-emerald-200">
          When you invest through Policybazaar - Save tax upto{" "}
          <span className="font-bold">₹5.01 L</span>
          <span className="float-right text-[11px] text-blue-600">Here’s How?</span>
        </div>

        {/* Footer note */}
        <div className="px-4 py-3 text-center text-[11px] text-slate-500">
          *Calculated for Person earning: &gt;10L per annum
        </div>
      </div>
    </div>
  );
}
