import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Headerlogin from "../headers/Headerlogin";
import Header from "../headers/Header";
import Footer from "../Footer";
import { useUserData } from "../../context/UserDataContext";
import PowerOfCompoundingCalculator from "./PowerOfCompoundingCalculator";
import ChildSavingsCalculator from "./ChildSavingsCalculator";
import CSIPlancomperision from "./CSIPlancomperision";
import ULIPComparisonModal from "./ULIPComparisonModal";
import ContactConfirmation from "../term insurance/ContactConfirmation";

// API data will be fetched dynamically

export default function CSIPolicy() {
  const navigate = useNavigate();
  const { userData } = useUserData();
  const [investFor, setInvestFor] = useState(5);
  const [withdrawAfter, setWithdrawAfter] = useState(10);
  const [search, setSearch] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showChildCalculator, setShowChildCalculator] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showULIPComparison, setShowULIPComparison] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetDetails = (policy) => {
    navigate('/child-saving-plan-config', {
      state: {
        selectedPolicy: policy,
        userData: {
          investFor,
          withdrawAfter,
          search
        }
      }
    });
  };

  // Fetch policies from API with age-based filtering
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        
        // Build query parameters for age-based filtering
        const params = new URLSearchParams();
        if (userData?.userAge) {
          params.append('parentAge', userData.userAge);
        }
        if (userData?.childAge) {
          params.append('childAge', userData.childAge);
        }
        
        const response = await fetch(`/api/child-saving-insurance/active?${params.toString()}`);
        const result = await response.json();
        
        if (result.success) {
          // Transform API data to match the expected format
          const transformedPolicies = result.childSavingInsurance.map((policy, index) => ({
            id: policy._id,
            tag: policy.planType === 'Child ULIP' ? 'ULIP Plan' : 'Child Plan',
            brand: policy.companyName,
            logo: policy.companyLogo,
            plan: policy.planName,
            returns10y: policy.bonusRate || 12.0,
            fund: policy.planType,
            payout: policy.sumAssured / 10000000, // Convert to crores (keep as number)
            cta: "Get Details",
            highlight: policy.waiverOfPremium,
            _raw: policy // Keep original data for reference
          }));
          setPolicies(transformedPolicies);
        } else {
          setError('Failed to fetch policies');
        }
      } catch (error) {
        setError('Failed to fetch policies');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [userData]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showULIPComparison) {
        setShowULIPComparison(false);
      }
    };

    if (showULIPComparison) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showULIPComparison]);

  const filtered = useMemo(() => {
    const filteredPolicies = policies.filter(
      (p) =>
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.plan.toLowerCase().includes(search.toLowerCase())
    );

    // Sort policies: popular first, then by returns (descending)
    return filteredPolicies.sort((a, b) => {
      // Popular policies first
      if (a._raw?.isPopular && !b._raw?.isPopular) return -1;
      if (!a._raw?.isPopular && b._raw?.isPopular) return 1;

      // Then by returns (higher returns first)
      return b.returns10y - a.returns10y;
    });
  }, [policies, search]);

  return (
    <div className="min-h-screen bg-slate-50">

      <Header />
     

      {/* Back button */}
      <div className="mx-auto max-w-[1200px] px-4 py-4">
        <button
          onClick={() => navigate('/child-saving-insurance')}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Child Saving Insurance
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[290px_1fr]">
        {/* LEFT: Filters & Compare */}
        <aside className="space-y-4 bg-white p-4">
          <UserChip 
            name={userData?.name || "User"} 
            age={`${userData?.userAge || "N/A"} Yrs`} 
            childAge={userData?.childAge ? `${userData.childAge} Yrs` : "N/A"}
          />
          <Panel title="Invested Amount">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">₹</span>
              <input
                type="number"
                inputMode="numeric"
                placeholder="Amount"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
              <span className="text-slate-400">/ Month</span>
            </div>
          </Panel>

          <Panel title="Invest for">
            <div className="flex items-center justify-between">
              <SelectSimple
                value={investFor}
                onChange={(v) => setInvestFor(Number(v))}
                options={[5, 7, 10, 12, 15].map((y) => ({ value: y, label: `${y} Yrs` }))}
              />
              <span className="text-[11px] text-slate-400">{new Date().getFullYear()}</span>
            </div>
          </Panel>

          <Panel title="Withdraw After">
            <div className="flex items-center justify-between">
              <SelectSimple
                value={withdrawAfter}
                onChange={(v) => setWithdrawAfter(Number(v))}
                options={[10, 12, 15, 20, 25].map((y) => ({ value: y, label: `${y} Yrs` }))}
              />
              <span className="text-[11px] text-slate-400">{new Date().getFullYear()}</span>
            </div>
          </Panel>

          <Panel title="Calculator">
            <div className="space-y-2 text-sm">
              <GhostButton onClick={() => setShowCalculator(true)}>Power of Compounding Calculator</GhostButton>
              <GhostButton onClick={() => setShowChildCalculator(true)}>Child's Education</GhostButton>
            </div>
          </Panel>

          <Panel title="Compare">
            <div className="space-y-2 text-sm">
              <GhostButton onClick={() => setShowComparison(true)}>Compare Child Plans/SSY/PPF</GhostButton>
              <GhostButton
                onClick={() => setShowULIPComparison(true)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Compare ULIPs / MFs
              </GhostButton>
            </div>
          </Panel>
        </aside>

        {/* RIGHT: Results */}
        <main className="space-y-4">
          {/* <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">Suggest Best Policy</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search company/plan"
                    className="w-56 rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">🔍</span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex items-center w-full my-6">
            <input
              type="text"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-base bg-gray-50 focus:ring-2 focus:ring-blue-200"
              defaultValue="Suggest Best Policy"
              readOnly
            />
            <button className="ml-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2 hover:bg-blue-100 transition">
              <img
                src="/assets/images/assistant1.png"
                alt="Assistant"
                className="w-6 h-6 object-contain"
              />
            </button>
          </div>
          <ContactConfirmation />
          {/* Show message if no matching plans found */}
          {filtered.length === 0 && !loading && !error && (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Matching Plans Found</h3>
              <p className="text-slate-600 mb-4">
                We couldn't find any child saving insurance plans that match your criteria.
              </p>
              {userData?.userAge && userData?.childAge && (
                <div className="text-sm text-slate-500 mb-4">
                  Parent Age: {userData.userAge} years | Child Age: {userData.childAge} years
                </div>
              )}
              <p className="text-sm text-slate-500">
                Please try adjusting your age criteria or contact our support team for assistance.
              </p>
            </div>
          )}

          {/* Show matching plans info */}
          {filtered.length > 0 && userData?.userAge && userData?.childAge && (
            <>
            </>
            // <div className="rounded-xl border border-green-200 bg-green-50 p-4 mb-4">
            //   <div className="flex items-center gap-2">
            //     <div className="text-green-600">✅</div>
            //     <div className="text-sm text-green-800">
            //       Found <strong>{filtered.length}</strong> plan{filtered.length > 1 ? 's' : ''} matching your criteria 
            //       (Parent: {userData.userAge} years, Child: {userData.childAge} years)
            //     </div>
            //   </div>
            // </div>
          )}

          {/* Highlight (first card) */}
          {filtered.length > 0 && (
            <PolicyCard policy={filtered[0]} showRibbon onGetDetails={handleGetDetails} />
          )}

          {/* Others */}
          {filtered.slice(1).map((p) => (
            <PolicyCard key={p.id} policy={p} onGetDetails={handleGetDetails} />
          ))}

          {/* footer pager imitation */}
          {filtered.length > 0 && (
            <div className="text-center text-xs text-slate-400">End of results</div>
          )}
        </main>
        </div>
      )}
      <Footer />

      {/* Power of Compounding Calculator Modal */}
      <PowerOfCompoundingCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
      />

      {/* Child Savings Calculator Modal */}
      <ChildSavingsCalculator
        isOpen={showChildCalculator}
        onClose={() => setShowChildCalculator(false)}
      />

      {/* Plan Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-white rounded-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4 rounded-t-xl">
              <h2 className="text-lg font-semibold text-slate-800">Compare Child Plans/SSY/PPF</h2>
              <button
                onClick={() => setShowComparison(false)}
                className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <CSIPlancomperision onPlanNow={() => setShowComparison(false)} />
          </div>
        </div>
      )}

      {/* ULIP Comparison Modal */}
      {showULIPComparison && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
          onClick={() => setShowULIPComparison(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ulip-comparison-title"
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-white rounded-xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ULIPComparisonModal
              onClose={() => setShowULIPComparison(false)}
              onOk={() => setShowULIPComparison(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Pieces ---------- */

function UserChip({ name, age, childAge }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500">👤</div>
      <div className="leading-tight">
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-slate-500">Parent: {age}</div>
        <div className="text-xs text-slate-500">Child: {childAge}</div>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 text-xs font-semibold tracking-wide text-slate-500">{title}</div>
      {children}
    </div>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-slate-700 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function SelectSimple({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function Badge({ children, color = "blue" }) {
  const map = {
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    yellow: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  };
  return (
    <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ring-1 ${map[color]}`}>
      {children}
    </span>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="text-right">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-base font-extrabold text-slate-800">{value}</div>
      {sub && <div className="text-[10px] text-slate-400">{sub}</div>}
    </div>
  );
}

function PolicyCard({ policy, showRibbon = false, onGetDetails }) {
  const handleGetDetails = () => {
    if (onGetDetails) {
      onGetDetails(policy);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* top banner for tags */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2">
        <Badge color="slate">{policy.tag}</Badge>
        {policy._raw?.isPopular && <Badge color="yellow">Popular</Badge>}
        {policy.highlight && <Badge color="emerald">Premium Waiver</Badge>}
      </div>

      <div className="grid items-center gap-4 px-4 py-3 md:grid-cols-[1fr_220px_220px_120px]">
        {/* left: brand + plan */}
        <div className="flex items-center gap-3">
          <img src={policy.logo} alt={policy.brand} className="h-5 w-auto object-contain" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-800">{policy.plan}</div>
            <div className="mt-1 text-[11px] text-slate-400">Capital Guarantee Solution</div>
          </div>
        </div>

        <Stat
          label="10 Yr Returns"
          value={`${policy.returns10y}%`}
          sub={policy.fund}
        />

        <Stat
          label="Lumpsum Payout"
          value={`₹ ${policy.payout.toFixed(2)} Cr`}
          sub="If you had invested 20 yrs ago"
        />

        <div className="flex justify-end">
          <button
            onClick={handleGetDetails}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            {policy.cta || "Get Details"}
          </button>
        </div>
      </div>

      {policy.subnote && (
        <div className="px-4 pb-3 text-[11px] text-slate-500">{policy.subnote}</div>
      )}

      {showRibbon && policy.ribbon && (
        <div className="rounded-b-xl border-t border-amber-100 bg-amber-50 px-4 py-2 text-[11px] font-medium text-amber-800">
          {policy.ribbon}
        </div>
      )}
    </div>
  );
}
