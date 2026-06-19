import React from "react";
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Zap, 
  ShieldAlert, 
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Target
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Transaction } from "../types";

interface FinancialCommandCenterProps {
  transactions: Transaction[];
  savingsRate: number;
  totalCredit: number;
  totalDebit: number;
  scamLogsCount: number;
  threatScans: Array<{ id: string; type: string; score: number; date: string }>;
  onNavigate: (tab: any) => void;
}

export default function FinancialCommandCenter({ 
  transactions, 
  savingsRate, 
  totalCredit, 
  totalDebit,
  scamLogsCount,
  threatScans,
  onNavigate 
}: FinancialCommandCenterProps) {
  
  // Format transaction trend data for Recharts
  const chartData = [
    { name: "Jan", Inflow: 5800, Outflow: 3800 },
    { name: "Feb", Inflow: 6000, Outflow: 4100 },
    { name: "Mar", Inflow: 6200, Outflow: 3950 },
    { name: "Apr", Inflow: 6000, Outflow: 4500 },
    { name: "May", Inflow: 6500, Outflow: 4200 },
    { name: "Jun", Inflow: totalCredit || 6500, Outflow: totalDebit || 4083 },
  ];

  const coreInsights = [
    {
      id: "ins-01",
      category: "Cash-flow",
      type: "success",
      title: "Elevated Savings Velocity",
      text: `Your current savings rate of ${savingsRate}% exceeds your primary goal threshold by 12.1%. Continue automated compounding checks.`
    },
    {
      id: "ins-02",
      category: "Security",
      type: "warning",
      title: "Potential Phishing Exposure",
      text: `Threat scanners detected 3 unrecognized SMS transaction patterns targeting local banks. Keep MFA settings active.`
    },
    {
      id: "ins-03",
      category: "Optimisation",
      type: "info",
      title: "Subscription Cleanup Alert",
      text: "You have 3 monthly streaming services active totaling ₹4,890. Consider consoldating duplicate entertainment conduits."
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-8 text-white">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#232323] pb-6">
        <div>
          <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Core Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">Intelligence Overview</h1>
          <p className="text-xs text-gray-400 mt-2">High-fidelity asset monitoring & real-time cyber defense metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/25 rounded-full text-xs font-semibold text-green-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>Enterprise Secured</span>
          </div>
          <button 
            className="px-4 py-2 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg text-xs font-sans transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>SYNC DATA</span>
          </button>
        </div>
      </header>

      {/* Hero Stats Row (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* widget 1: Financial Health Score */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-800 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#D8F275]/5 rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">Financial Health Score</span>
            <span className="px-2.5 py-0.5 bg-green-500/10 text-green-400 rounded-full font-mono text-[10px] uppercase font-bold">OPTIMAL</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight font-sans text-white">84</span>
            <span className="text-gray-500 font-medium text-lg">/100</span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#232323] text-xs text-gray-400">
            <span className="text-[#D8F275] font-semibold">↑ 4.2%</span> from last bank billing period
          </div>
        </div>

        {/* widget 2: Monthly Spending */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">Monthly Spending</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight font-sans text-white">
              ₹{totalDebit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-xs text-gray-400 font-mono mt-1">11 isolated debit transactions</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#232323] text-xs text-gray-400">
            Current cash footprint is <span className="text-[#D8F275] font-semibold">stable</span>
          </div>
        </div>

        {/* widget 3: Savings Rate */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">Savings Rate</span>
            <TrendingUp className="w-4 h-4 text-[#D8F275]" />
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight font-sans text-white">{savingsRate}%</span>
            <p className="text-xs text-gray-400 font-mono mt-1">Goal threshold set: 20.0%</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#232323] text-xs text-gray-400">
            Current status: <span className="text-white font-semibold">High-Yield Sinking Compounding</span>
          </div>
        </div>

        {/* widget 4: Income Tracking */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">Income Tracking</span>
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight font-sans text-white">
              ₹{totalCredit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <p className="text-xs text-gray-400 font-mono mt-1">Direct deposits & salary pipeline</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#232323] text-xs text-gray-400">
            Net Surplus: <span className="text-[#D8F275] font-mono">₹{(totalCredit - totalDebit).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* widget 5: Goal Progress */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all cursor-pointer" onClick={() => onNavigate("wealth_planning")}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">Goal Progress</span>
            <Target className="w-4 h-4 text-[#D8F275]" />
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight font-sans text-white">76%</span>
            <p className="text-xs text-gray-400 font-mono mt-1">Average milestone completion rate</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#232323] text-xs text-[#D8F275] flex items-center justify-between font-mono text-[10px]">
            <span>VIEW WEALTH OBJECTIVES</span>
            <ChevronRight className="w-3" />
          </div>
        </div>

        {/* widget 6: Threat Alerts */}
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between hover:border-zinc-800 transition-all cursor-pointer" onClick={() => onNavigate("scam_intelligence")}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-mono tracking-wider uppercase">Threat Alerts</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight text-amber-400">03</span>
            <p className="text-xs text-gray-400 font-mono mt-1">Suspect vectors parsed & blocked</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#232323] text-xs text-amber-500 flex items-center justify-between font-mono text-[10px]">
            <span>FORENSIC SCAN ACTIVE</span>
            <ChevronRight className="w-3" />
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Chart, Transactions list) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main spending trend Area Chart */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold font-sans">Cash Flow Projection Matrix</h3>
                <p className="text-xs text-gray-400">6-Month consolidated inflow vs outflow correlation metrics</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#D8F275]"></span>
                  <span className="text-gray-300">Inflow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#EF4444]"></span>
                  <span className="text-gray-300">Outflow</span>
                </div>
              </div>
            </div>
            
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#52525b" tickLine={false} />
                  <YAxis stroke="#52525b" tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#111111", border: "1px solid #232323", borderRadius: "8px" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <defs>
                    <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D8F275" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#D8F275" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="Inflow" stroke="#D8F275" strokeWidth={2} fillOpacity={1} fill="url(#colorInflow)" />
                  <Area type="monotone" dataKey="Outflow" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOutflow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ledger extraction recent activity summary card/table */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold font-sans">Recent Ledger Transactions</h3>
                <p className="text-xs text-gray-400">Extracted and structured from dynamic bank statements</p>
              </div>
              <button 
                onClick={() => onNavigate("ledger")}
                className="text-xs font-semibold text-[#D8F275] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Access Ledger Engine</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#232323] text-gray-400 text-xs font-mono uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 font-medium">Recipient / Source</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#151515]">
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-900/30 transition-colors group">
                      <td className="py-3.5 pr-4 text-xs font-mono text-gray-400">{tx.date}</td>
                      <td className="py-3.5 font-medium group-hover:text-[#D8F275] transition-colors">{tx.description}</td>
                      <td className="py-3.5 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1e1e1e] border border-[#2b2b2b] text-gray-300">
                          {tx.category}
                        </span>
                      </td>
                      <td className={`py-3.5 text-right font-semibold font-mono ${
                        tx.type === "Credit" ? "text-green-400" : "text-white"
                      }`}>
                        {tx.type === "Credit" ? "+" : "-"}₹{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (AI Strategic Advice & Security Threat Updates) */}
        <div className="space-y-8">
          
          {/* AI Guardian smart actions board */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8F275]/3 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#D8F275]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-sans text-white">AI Fiduciary Intelligence</h3>
                <p className="text-[10px] text-gray-400 font-mono">SCANNED 5 MINUTES AGO</p>
              </div>
            </div>

            <div className="space-y-4">
              {coreInsights.map((ins) => (
                <div key={ins.id} className="p-4 rounded-lg bg-[#0B0B0B] border border-[#232323] hover:border-zinc-800 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D8F275]">
                      {ins.category}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      ins.type === "success" 
                        ? "bg-green-400" 
                        : ins.type === "warning" 
                        ? "bg-amber-400" 
                        : "bg-blue-400"
                    }`} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{ins.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{ins.text}</p>
                </div>
              ))}
            </div>

            <button 
              className="w-full mt-6 py-3 bg-[#1e1e1e] hover:bg-zinc-800 border border-[#232323] text-xs text-center text-[#D8F275] font-semibold rounded-lg font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => onNavigate("copilot")}
            >
              <span>Initiative Chat with FinCopilot</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live Cyber Scam threats feed */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <h3 className="text-base font-bold font-sans mb-4 text-white">Scam Defense Logs</h3>
            <p className="text-xs text-gray-400 mb-6">Real-time indicators scanned by SMS, Email and OCR engines</p>

            <div className="space-y-4">
              {threatScans.slice(0, 3).map((scan) => (
                <div key={scan.id} className="flex items-start justify-between gap-3 pb-4 border-b border-[#232323] last:border-0 last:pb-0">
                  <div>
                    <span className="text-xs font-mono text-gray-500 uppercase">{scan.type} SCAN</span>
                    <h4 className="text-sm font-semibold text-white mt-0.5">Secure Transaction Checked</h4>
                    <span className="text-[11px] text-gray-500 font-mono block mt-1">{scan.date}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                      scan.score > 70 
                        ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                        : "bg-green-500/10 text-green-400 border border-green-500/20"
                    }`}>
                      {scan.score}% Threat
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="w-full mt-6 py-3 bg-[#0B0B0B] hover:bg-[#111111] border border-[#232323] text-xs text-center text-gray-300 font-semibold rounded-lg font-sans transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => onNavigate("scam_intelligence")}
            >
              <span>Scan New Fraud Messages</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
