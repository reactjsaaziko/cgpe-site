import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Right-side drawer that shows plan details (converted from the provided mockup)
 * Uses TailwindCSS for styling. Appears from the right with an overlay.
 */
export default function PlanDetailsDrawer({ isOpen, onClose, policy, inline = false }) {
  if (!isOpen) return null;

  const planTitle = policy?.plan || "Systematic Retirement Plan";
  const company = policy?.company || "HDFC Life";
  const logo = policy?.logo || "./assets/images/HDFC_Life_logo.png.png";
  const annuityRate = policy?.annuityRate || "11.77%";
  const youGive = policy?.youGive || "₹36 L";
  const youGetTotal = policy?.youGetTotal || "₹1.27 Cr";
  const monthlyPension = policy?.youGet || "₹35.3 k / month";

  const navigate = useNavigate();
  const handleProceed = () => {
    navigate("/retirement-plan-config");
  };

  if (inline) {
    return (
      <aside className="absolute right-0 top-0 z-40 w-full max-w-[560px] rounded-l-2xl border border-slate-200 bg-white shadow-xl pointer-events-auto">
        <div className="flex max-h-[88vh] flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-slate-800">Understand your plan</div>
              <div className="text-slate-500">{planTitle}</div>
            </div>
            <div className="flex items-center gap-3">
              <img src={logo} alt={company} className="h-10 w-10 object-contain" />
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-4">
              <div className="text-xs font-semibold text-orange-700">You Give</div>
              <div className="mt-1 text-xl font-extrabold text-orange-800">{youGive}</div>
              <div className="mt-3 text-xs font-semibold text-orange-700">You Get</div>
              <div className="mt-1 text-xl font-extrabold text-orange-800">{youGetTotal}</div>
            </div>
            <div className="rounded-2xl bg-yellow-50 p-4">
              <div className="text-sm font-extrabold text-yellow-700">100% Guaranteed Life long Annuity</div>
              <div className="mt-2 text-xs text-yellow-700">Get guaranteed pension throughout your life</div>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-4">
              <div className="text-sm font-extrabold text-indigo-700">Get Annuity Rate of {annuityRate}</div>
              <div className="mt-2 text-xs text-indigo-700">Annuity rate is the guaranteed annual return offered to Annuitant</div>
            </div>
          </div>

          {/* Body scrollable */}
          <div className="flex-1 overflow-y-auto px-5 pb-28">
            <section className="pt-2">
              <h3 className="border-b pb-2 text-sm font-bold text-slate-700">Product Benefits</h3>
              <div className="mt-4 space-y-5 text-[13px] leading-relaxed text-slate-700">
                <div>
                  <div className="font-semibold text-slate-800">Life Time income</div>
                  <p className="text-slate-600">Starting after deferment period, you get 100% Guaranteed income throughout your life.</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Guaranteed interest Rate</div>
                  <p className="text-slate-600">Pension amount stays fixed throughout your life time</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Regular Premium</div>
                  <p className="text-slate-600">You have to pay monthly or annually & then Get pension for life.</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Flexible Pension Options</div>
                  <p className="text-slate-600">You can choose how you get your pension amount: Monthly, Quaterly, Half Yearly, Yearly</p>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h3 className="border-b pb-2 text-sm font-bold text-slate-700">Annuity Timeline</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-3 text-[13px] text-indigo-800">
                  <div className="grid h-6 w-6 flex-none place-items-center rounded-full bg-white">💡</div>
                  <p>You pay ₹20 K monthly for 5 Years and you get ₹18.6 Lacs as payout after 10 years.</p>
                </div>

                <div className="rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between border-b px-4 py-2 text-xs">
                    <div className="font-semibold text-slate-700">Policy Start</div>
                    <div className="rounded-full bg-blue-600 px-3 py-1 text-white">You Invest</div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 text-sm">
                    <div className="text-slate-700">₹ 20 K / month <span className="text-xs text-slate-500">for 5 Years</span></div>
                    <div className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Total ₹ 12 Lacs</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom bar */}
          <div className="sticky bottom-0 left-0 right-0 border-t bg-white">
            <div className="flex items-center justify-between px-5 py-3">
              <div>
                <div className="text-xs text-slate-500">Pension</div>
                <div className="text-lg font-extrabold text-slate-800">{monthlyPension}</div>
              </div>
              <button onClick={handleProceed} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Proceed</button>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // Fallback: overlay mode (unused for inline placement)
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-[560px] bg-white shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <div className="text-2xl font-extrabold tracking-tight text-slate-800">Understand your plan</div>
              <div className="text-slate-500">{planTitle}</div>
            </div>
            <div className="flex items-center gap-3">
              <img src={logo} alt={company} className="h-10 w-10 object-contain" />
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-4">
              <div className="text-xs font-semibold text-orange-700">You Give</div>
              <div className="mt-1 text-xl font-extrabold text-orange-800">{youGive}</div>
              <div className="mt-3 text-xs font-semibold text-orange-700">You Get</div>
              <div className="mt-1 text-xl font-extrabold text-orange-800">{youGetTotal}</div>
            </div>
            <div className="rounded-2xl bg-yellow-50 p-4">
              <div className="text-sm font-extrabold text-yellow-700">100% Guaranteed Life long Annuity</div>
              <div className="mt-2 text-xs text-yellow-700">Get guaranteed pension throughout your life</div>
            </div>
            <div className="rounded-2xl bg-indigo-50 p-4">
              <div className="text-sm font-extrabold text-indigo-700">Get Annuity Rate of {annuityRate}</div>
              <div className="mt-2 text-xs text-indigo-700">Annuity rate is the guaranteed annual return offered to Annuitant</div>
            </div>
          </div>

          {/* Body scrollable */}
          <div className="flex-1 overflow-y-auto px-5 pb-32">
            <section className="pt-2">
              <h3 className="border-b pb-2 text-sm font-bold text-slate-700">Product Benefits</h3>
              <div className="mt-4 space-y-5 text-[13px] leading-relaxed text-slate-700">
                <div>
                  <div className="font-semibold text-slate-800">Life Time income</div>
                  <p className="text-slate-600">Starting after deferment period, you get 100% Guaranteed income throughout your life.</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Guaranteed interest Rate</div>
                  <p className="text-slate-600">Pension amount stays fixed throughout your life time</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Regular Premium</div>
                  <p className="text-slate-600">You have to pay monthly or annually & then Get pension for life.</p>
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Flexible Pension Options</div>
                  <p className="text-slate-600">You can choose how you get your pension amount: Monthly, Quaterly, Half Yearly, Yearly</p>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <h3 className="border-b pb-2 text-sm font-bold text-slate-700">Annuity Timeline</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-3 text-[13px] text-indigo-800">
                  <div className="grid h-6 w-6 flex-none place-items-center rounded-full bg-white">💡</div>
                  <p>You pay ₹20 K monthly for 5 Years and you get ₹18.6 Lacs as payout after 10 years.</p>
                </div>

                <div className="rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between border-b px-4 py-2 text-xs">
                    <div className="font-semibold text-slate-700">Policy Start</div>
                    <div className="rounded-full bg-blue-600 px-3 py-1 text-white">You Invest</div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 text-sm">
                    <div className="text-slate-700">₹ 20 K / month <span className="text-xs text-slate-500">for 5 Years</span></div>
                    <div className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">Total ₹ 12 Lacs</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 border-t bg-white">
            <div className="flex items-center justify-between px-5 py-3">
              <div>
                <div className="text-xs text-slate-500">Pension</div>
                <div className="text-lg font-extrabold text-slate-800">{monthlyPension}</div>
              </div>
              <button onClick={handleProceed} className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700">Proceed</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}


