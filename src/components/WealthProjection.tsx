import React from "react";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts";
import { 
  TrendingUp, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  Briefcase, 
  ShieldCheck,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";

export default function WealthProjection() {
  const [monthlyIncome, setMonthlyIncome] = React.useState(120000);
  const [monthlyExpenses, setMonthlyExpenses] = React.useState(75000);
  const [monthlySavings, setMonthlySavings] = React.useState(15000);
  const [monthlyInvestments, setMonthlyInvestments] = React.useState(25000);
  const [interestRate, setInterestRate] = React.useState(8); // Annual compounding percentage
  const [extraMonthlySave, setExtraMonthlySave] = React.useState(5000);
  const [applyOptimize, setApplyOptimize] = React.useState(true);
  const [targetGoalAmount, setTargetGoalAmount] = React.useState(1000000); // 10 Lakhs

  // Calculate compound curves for 10 years
  const projectionData = React.useMemo(() => {
    const data = [];
    const monthlyRate = interestRate / 100 / 12;
    
    let balanceBaseline = 120000; // Starting assets
    let balanceOptimized = 120000;

    const baseMonthlySave = monthlySavings + monthlyInvestments;
    const optMonthlySave = monthlySavings + monthlyInvestments + extraMonthlySave;

    for (let year = 1; year <= 10; year++) {
      // Compound monthly for 12 months
      for (let month = 1; month <= 12; month++) {
        balanceBaseline = (balanceBaseline + baseMonthlySave) * (1 + monthlyRate);
        balanceOptimized = (balanceOptimized + optMonthlySave) * (1 + monthlyRate);
      }

      data.push({
        year: `${year}Y`,
        "Baseline Forecast": Math.round(balanceBaseline),
        "Optimized Pipeline": Math.round(balanceOptimized)
      });
    }

    return data;
  }, [monthlySavings, monthlyInvestments, interestRate, extraMonthlySave]);

  // Compute goal achievement timeline in months
  const goalTimelines = React.useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const baseMonthlySave = monthlySavings + monthlyInvestments;
    const optMonthlySave = monthlySavings + monthlyInvestments + (applyOptimize ? extraMonthlySave : 0);
    
    let monthsBaseline = 0;
    let balanceBase = 120000;
    while (balanceBase < targetGoalAmount && monthsBaseline < 360) { // cap at 30 years
      balanceBase = (balanceBase + baseMonthlySave) * (1 + monthlyRate);
      monthsBaseline++;
    }

    let monthsOptimized = 0;
    let balanceOpt = 120000;
    while (balanceOpt < targetGoalAmount && monthsOptimized < 360) {
      balanceOpt = (balanceOpt + optMonthlySave) * (1 + monthlyRate);
      monthsOptimized++;
    }

    return {
      baselineMonths: monthsBaseline,
      optimizedMonths: monthsOptimized,
      savedMonths: Math.max(0, monthsBaseline - monthsOptimized)
    };
  }, [targetGoalAmount, monthlySavings, monthlyInvestments, interestRate, extraMonthlySave, applyOptimize]);

  // Compute stats projections
  const oneYearRes = projectionData[0]?.["Baseline Forecast"] || 0;
  const fiveYearRes = projectionData[4]?.["Baseline Forecast"] || 0;
  const tenYearRes = projectionData[9]?.["Baseline Forecast"] || 0;

  const fiveYearOptRes = projectionData[4]?.["Optimized Pipeline"] || 0;
  const tenYearOptRes = projectionData[9]?.["Optimized Pipeline"] || 0;

  const currencyFormatter = (value: number) => {
    return "₹" + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-8 text-white">
      {/* Header */}
      <header className="mb-10 border-b border-[#232323] pb-6">
        <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Projection Engine</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">Compounding Sandbox</h1>
        <p className="text-xs text-gray-400 mt-2">Multi-variable compounding modeling and forecasting scenario engines.</p>
      </header>

      {/* Inputs sliders Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Controllers box (Left 1 col) */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 space-y-6">
          <h3 className="text-lg font-bold font-sans mb-1 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#D8F275]" />
            <span>Portfolio Variables</span>
          </h3>
          <p className="text-xs text-gray-400">Configure parameters below to regenerate assets pathing charts dynamically.</p>

          <div className="space-y-5 text-xs font-mono">
            {/* Income Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Monthly Income</span>
                <span className="text-[#D8F275] font-bold">₹{monthlyIncome.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={20000} 
                max={500000} 
                step={5000} 
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full accent-[#D8F275]"
              />
            </div>

            {/* Expenses Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Fixed Commitments (Expenses)</span>
                <span className="text-red-400 font-bold">₹{monthlyExpenses.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={10000} 
                max={300000} 
                step={2500} 
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="w-full accent-red-400"
              />
            </div>

            {/* Savings Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Monthly Cash Savings</span>
                <span className="text-amber-400 font-bold">₹{monthlySavings.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={150000} 
                step={1000} 
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>

            {/* Investments Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Base Investment Flow</span>
                <span className="text-[#B7FF4A] font-bold">₹{monthlyInvestments.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min={1000} 
                max={150000} 
                step={1000} 
                value={monthlyInvestments}
                onChange={(e) => setMonthlyInvestments(Number(e.target.value))}
                className="w-full accent-[#B7FF4A]"
              />
            </div>

            {/* Interest Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Annual Compound yield</span>
                <span className="text-blue-400 font-bold">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                min={3} 
                max={20} 
                step={0.5} 
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-blue-400"
              />
            </div>

            {/* Goal Target Amount Selector & Slider */}
            <div className="space-y-2 pt-3 border-t border-[#232323]">
              <div className="flex justify-between text-gray-300">
                <span>Target Wealth Goal</span>
                <span className="text-[#D8F275] font-bold">₹{(targetGoalAmount/100000).toFixed(1)} Lakhs</span>
              </div>
              <input 
                type="range" 
                min={100000} 
                max={5000000} 
                step={100000} 
                value={targetGoalAmount}
                onChange={(e) => setTargetGoalAmount(Number(e.target.value))}
                className="w-full accent-[#D8F275]"
              />
              <div className="flex gap-2 justify-between">
                {[500000, 1000000, 2500000, 5000000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTargetGoalAmount(amt)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${
                      targetGoalAmount === amt 
                        ? "bg-[#D8F275] text-black border-[#D8F275]" 
                        : "bg-[#0B0B0B] text-gray-400 border-[#232323] hover:text-white"
                    }`}
                  >
                    ₹{amt/100000}L
                  </button>
                ))}
              </div>
            </div>

            {/* Scenario Optimiser trigger */}
            <div className="pt-4 border-t border-[#232323] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-sans">Simulate extra savings</span>
                <input 
                  type="checkbox" 
                  checked={applyOptimize} 
                  onChange={(e) => setApplyOptimize(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#D8F275] cursor-pointer"
                />
              </div>

              {applyOptimize && (
                <div className="space-y-2 p-3 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                  <div className="flex justify-between text-gray-400 text-[10px]">
                    <span>SINKING CAPITAL STEP</span>
                    <span className="text-green-400 font-bold">+₹{extraMonthlySave.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min={1000} 
                    max={25000} 
                    step={1000} 
                    value={extraMonthlySave}
                    onChange={(e) => setExtraMonthlySave(Number(e.target.value))}
                    className="w-full accent-[#B7FF4A]"
                  />
                  <span className="text-[10px] text-gray-500 font-sans leading-normal block">
                    Illustrates the growth acceleration trajectory by pocketing slightly more monthly.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Forecast visualisations curves (Right 2 cols) */}
        <div className="lg:col-span-2 bg-[#111111] border border-[#232323] rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold font-sans">Compounding Growth Velocity Model</h3>
              <p className="text-xs text-gray-400 mt-0.5">Asset accumulations curves extrapolated over a 10-year timeline</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
                <span>Baseline Curve</span>
              </div>
              {applyOptimize && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#D8F275]"></span>
                  <span>Optimized (+₹{extraMonthlySave.toLocaleString()})</span>
                </div>
              )}
            </div>
          </div>

          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#232323" />
                <XAxis dataKey="year" stroke="#52525b" tickLine={false} />
                <YAxis stroke="#52525b" tickLine={false} tickFormatter={(val) => `₹${val/100000}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111111", border: "1px solid #232323", borderRadius: "8px" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: any) => ["₹" + value.toLocaleString(), ""]}
                />
                <defs>
                  <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D8F275" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#D8F275" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="Baseline Forecast" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorBaseline)" />
                {applyOptimize && (
                  <Area type="monotone" dataKey="Optimized Pipeline" stroke="#D8F275" strokeWidth={2} fillOpacity={1} fill="url(#colorOptimized)" />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-[#232323] text-[10px] text-gray-500 font-mono text-center flex items-center justify-center gap-1.5 leading-normal">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Mathematical simulations assume monthly compounded frequency with flat variables distributions.</span>
          </div>
        </div>

      </div>

      {/* Goal Achievement Timeline Module */}
      <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#232323]">
          <div>
            <h3 className="text-base font-bold font-sans flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#D8F275]" />
              <span>Goal Achievement Timeline</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">Calculates days/months needed to accumulate your designated target of <span className="text-[#D8F275] font-semibold">₹{targetGoalAmount.toLocaleString()}</span></p>
          </div>
          {applyOptimize && goalTimelines.savedMonths > 0 && (
            <div className="px-3 py-1 bg-[#D8F275]/10 border border-[#D8F275]/20 text-[#D8F275] text-[10px] font-mono rounded-full font-bold">
              OPTIMIZER SAVES YOU {goalTimelines.savedMonths} MONTHS
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0B0B0B] border border-[#232323] p-5 rounded-lg flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-500 uppercase block tracking-wider">Baseline Timeline</span>
              <span className="text-3xl font-bold font-mono text-white mt-1.5 block">
                {goalTimelines.baselineMonths >= 360 ? "30+ Years" : `${Math.floor(goalTimelines.baselineMonths / 12)}Y ${goalTimelines.baselineMonths % 12}M`}
              </span>
              <p className="text-xs text-gray-400 mt-2 font-sans leading-normal">
                Estimated index threshold assuming standard Monthly Savings (₹{monthlySavings.toLocaleString()}) and Base Investments (₹{monthlyInvestments.toLocaleString()}) pathing.
              </p>
            </div>
          </div>

          <div className="bg-[#0B0B0B] border border-[#D8F275]/10 p-5 rounded-lg flex flex-col justify-between relative overflow-hidden group hover:border-[#D8F275]/20 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#D8F275]/2.5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-[#D8F275] uppercase block tracking-wider font-semibold">Scenario Simulation Pipeline</span>
                <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded text-[8px] font-mono uppercase font-bold">加速</span>
              </div>
              <span className="text-3xl font-bold font-mono text-[#D8F275] mt-1.5 block">
                {goalTimelines.optimizedMonths >= 360 ? "30+ Years" : `${Math.floor(goalTimelines.optimizedMonths / 12)}Y ${goalTimelines.optimizedMonths % 12}M`}
              </span>
              <p className="text-xs text-gray-300 mt-2 font-sans leading-normal">
                What if I save <span className="text-white font-semibold">₹{extraMonthlySave} more</span> per month? You bypass <span className="text-green-400 font-semibold">{goalTimelines.savedMonths} months</span> of waiting!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Projection milestones timeline details panels */}
      <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">MILESTONE TIMELINE BREAKDOWNS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Year 1 Card */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-5 relative overflow-hidden">
          <span className="text-[10px] text-gray-500 font-mono block">1-YEAR HORIZON</span>
          <h4 className="text-2xl font-bold font-mono text-white mt-1.5">{currencyFormatter(oneYearRes)}</h4>
          
          <div className="mt-4 pt-3 border-t border-[#232323]/60">
            <p className="text-xs text-gray-400 leading-normal font-sans">
              Provides core liquidity reserves. This baseline handles approximately **3 months** of operational household rent commitments.
            </p>
          </div>
        </div>

        {/* Year 5 Card */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-5 relative overflow-hidden group hover:border-[#D8F275]/20 transition-all">
          <span className="text-[10px] text-gray-500 font-mono block flex items-center justify-between">
            <span>5-YEAR HORIZON</span>
            {applyOptimize && <span className="text-[#D8F275] text-[9px] uppercase font-bold text-right">OPTIMIZER TRIGGERED</span>}
          </span>
          <h4 className="text-2xl font-bold font-mono text-white mt-1.5">{currencyFormatter(fiveYearRes)}</h4>
          {applyOptimize && (
            <div className="text-xs text-[#D8F275] font-mono mt-0.5 font-semibold">
              Optimized: {currencyFormatter(fiveYearOptRes)}
            </div>
          )}
          
          <div className="mt-4 pt-3 border-t border-[#232323]/60 text-xs text-gray-400">
            <span className="text-green-400 block font-semibold mb-1">
              {applyOptimize ? `+₹${(fiveYearOptRes - fiveYearRes).toLocaleString()} surplus generated` : "Base compounding path"}
            </span>
            Accelerates financial leverage thresholds significantly.
          </div>
        </div>

        {/* Year 10 Card */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-5 relative overflow-hidden">
          <span className="text-[10px] text-gray-500 font-mono block">10-YEAR HORIZON</span>
          <h4 className="text-2xl font-bold font-mono text-white mt-1.5">{currencyFormatter(tenYearRes)}</h4>
          {applyOptimize && (
            <div className="text-xs text-[#D8F275] font-mono mt-0.5 font-semibold">
              Optimized: {currencyFormatter(tenYearOptRes)}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#232323]/60 text-xs text-gray-400">
            <span className="text-green-400 block font-semibold mb-1">
              {applyOptimize ? `+₹${(tenYearOptRes - tenYearRes).toLocaleString()} extra wealth` : "Base compounding path"}
            </span>
            Yields generation wealth buffers. Highly secure for multi-asset acquisitions.
          </div>
        </div>

      </div>
    </div>
  );
}
