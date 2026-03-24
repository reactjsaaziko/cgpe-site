import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserDataContext";
import Header from "../headers/Header";
import Footer from "../Footer";
import PlanDetailsDrawer from "./PlanDetailsDrawer";
import ContactConfirmation from "../term insurance/ContactConfirmation";

/** Suggest Best Policy – screenshot-matched layout */
export default function RIPolicySuggestions() {
  const navigate = useNavigate();
  const { userData, clearUserData, isLoading } = useUserData();
  
  // sidebar state
  const [amount, setAmount] = useState("");
  const [payFor, setPayFor] = useState(5);
  const [pensionAfter, setPensionAfter] = useState(10);
  const [q, setQ] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user data exists, if not redirect to retirement form
  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) {
      return;
    }
    
    // Only redirect if userData is null after loading
    if (!userData) {
      navigate('/retirement-insurance');
      return;
    }
    
    // If userData exists but is not for retirement insurance, redirect
    if (userData.insuranceType !== 'retirement') {
      navigate('/retirement-insurance');
      return;
    }
  }, [userData, navigate, isLoading]);

  // Fetch filtered policies from API based on user data
  useEffect(() => {
    const fetchFilteredPolicies = async () => {
      if (!userData || userData.insuranceType !== 'retirement') {
        return;
      }

      try {
        setLoading(true);
        
        // Build query parameters from user data
        const params = new URLSearchParams({
          userAge: userData.userAge || '',
          annualIncome: userData.annualIncome || '',
          city: userData.city || ''
        });

        const response = await fetch(`/api/retirement-insurance/policies/filtered?${params}`);
        const result = await response.json();
        
        if (result.success) {
          setPolicies(result.data);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError('Failed to fetch filtered retirement insurance policies');
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredPolicies();
  }, [userData]);

  // Transform API data to match the expected format
  const transformedPolicies = useMemo(() => {
    return policies.map(policy => ({
      id: policy._id,
      company: policy.companyName,
      logo: policy.companyLogo || "./assets/images/HDFC_life_logo.png.png",
      plan: policy.planName,
      youGet: policy.monthlyPension ? `₹ ${(policy.monthlyPension / 1000).toFixed(1)} k / monthly` : `₹ ${(policy.pensionAmount / 1000).toFixed(1)} k / monthly`,
      sub: `Life‑long from ${new Date().getFullYear() + pensionAfter}`,
      totalPayout: policy.totalPayout ? `₹ ${(policy.totalPayout / 10000000).toFixed(2)} Cr` : `₹ ${(policy.pensionAmount * 12 * 20 / 10000000).toFixed(2)} Cr`,
      ribbon: policy.isPopular ? "Buy Online & Get ₹55 K Extra   See How" : null,
      note: policy.returnRate ? `If you had invested ${policy.policyTerm} yrs ago` : null,
      rating: policy.rating || 4.0,
      reviews: policy.reviews || 0,
      features: policy.features || [],
      benefits: policy.benefits || [],
      exclusions: policy.exclusions || [],
      tags: policy.tags || [],
      badges: policy.badges || []
    }));
  }, [policies, pensionAfter]);

  const filtered = transformedPolicies.filter(
    (p) =>
      p.company.toLowerCase().includes(q.toLowerCase()) ||
      p.plan.toLowerCase().includes(q.toLowerCase())
  );

  if (isLoading || loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-red-600">Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Header/>
   
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <UserChip 
            name={userData?.name || "User"} 
            age={`${userData?.userAge || "N/A"} Yrs`} 
          />

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500">
                Invested Amount
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-slate-200">
                <span className="px-3 text-slate-400">₹</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder=""
                  className="h-10 w-full rounded-r-xl px-2 text-sm outline-none"
                />
                <span className="px-3 text-slate-400">/ Month</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500">
                pay for
              </label>
              <Select value={payFor} onChange={setPayFor} options={[5, 10, 15, 20]} suffix="Yrs" />
              <div className="mt-1 text-[11px] text-slate-400">You Give Total: 36L</div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500">
                Start Pension After 
              </label>
              <Select value={pensionAfter} onChange={setPensionAfter} options={[10, 12, 15, 20]} suffix="Yrs" />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="relative space-y-4">
          {/* Top search bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700">Suggest Best Policy</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    clearUserData();
                    navigate('/retirement-insurance');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Start Over
                </button>
                <div className="relative">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search company or plan"
                    className="w-72 rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-400"
                  />
                  <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">🔍</span>
                </div>
              </div>
            </div>
          </div>
          <ContactConfirmation />


          {/* Cards */}
          {filtered.length > 0 ? (
            filtered.map((p, idx) => (
              <PolicyCard
                key={p.id}
                {...p}
                highlight={idx === 0}
                onGetDetails={() => {
                  setSelectedPolicy(p);
                  setIsDrawerOpen(true);
                }}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-slate-500">No retirement plans found matching your criteria.</p>
              <button
                onClick={() => {
                  clearUserData();
                  navigate('/retirement-insurance');
                }}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Update Your Details
              </button>
            </div>
          )}

          {/* Inline drawer container aligned to the right edge of the main column */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            <PlanDetailsDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              policy={selectedPolicy}
              inline
            />
          </div>
        </main>
      </div>
    </div>
    <Footer/>
    </>
  );
}

/* ====== Small building blocks ====== */

function UserChip({ name, age }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500">👤</div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-slate-500">{age}</div>
        </div>
      </div>
    </div>
  );
}

function Select({ value, onChange, options, suffix = "" }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-10 w-full bg-transparent text-sm outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o} {suffix}
            </option>
          ))}
        </select>
        <span className="text-slate-400">▾</span>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div className="text-left">
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-lg font-extrabold text-slate-800">{value}</div>
      {sub && <div className="text-[11px] text-slate-500">{sub}</div>}
    </div>
  );
}

function PolicyCard({
  company,
  logo,
  plan,
  youGet,
  sub,
  totalPayout,
  note,
  ribbon,
  highlight = false,
  onGetDetails,
}) {
  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm ${
        highlight ? "border-blue-200" : "border-slate-200"
      }`}
    >
      {/* optional ribbon */}
      {ribbon && (
        <div className="rounded-t-2xl bg-emerald-50 px-4 py-2 text-[11px] font-medium text-emerald-700">
          {ribbon}
        </div>
      )}

      <div className="grid items-center gap-4 px-4 py-4 md:grid-cols-[1fr_220px_160px]">
        {/* Left: logo + plan */}
        <div className="flex flex-row items-center gap-4">
          <img src={logo} alt={company} className="h-16 w-16 object-contain" />
          <div className="flex flex-col min-w-0">
            <div className="truncate text-sm font-semibold text-slate-700">{plan}</div>
            <div className="mt-1 text-[11px] text-slate-500">{company}</div>
          </div>
        </div>

        {/* You get */}
        <div className="text-left md:text-left">
          <div className="text-[10px] uppercase tracking-wide text-slate-400">You Get</div>
          <div className="text-lg font-extrabold text-slate-800">{youGet}</div>
          <div className="text-[11px] text-slate-500">{sub}</div>
        </div>

        {/* Total payout + CTA */}
        <div className="flex items-center justify-between min-w-[100px] gap-3 md:justify-end">
          <Stat label="Total Payout" value={totalPayout} />
          <button
            onClick={onGetDetails}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Get Details
          </button>
        </div>
      </div>

      {note && (
        <div className="px-4 pb-4 text-[11px] text-slate-500">{note}</div>
      )}
    </div>
  );
}
