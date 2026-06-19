import React from "react";
import { 
  Target, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  AlertCircle,
  Clock,
  ShieldCheck
} from "lucide-react";
import { WealthGoal } from "../types";

interface WealthPlanningProps {
  goals: WealthGoal[];
  onAddGoal: (goal: WealthGoal) => void;
  onDeleteGoal: (id: string) => void;
  onUpdateGoalProgress: (id: string, newAmount: number) => void;
}

export default function WealthPlanning({ 
  goals, 
  onAddGoal, 
  onDeleteGoal, 
  onUpdateGoalProgress 
}: WealthPlanningProps) {
  
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [goalName, setGoalName] = React.useState("");
  const [goalCategory, setGoalCategory] = React.useState<WealthGoal["category"]>("Emergency Fund");
  const [targetAmount, setTargetAmount] = React.useState(50000);
  const [currentAmount, setCurrentAmount] = React.useState(15000);
  const [deadlineDate, setDeadlineDate] = React.useState("2026-12-31");
  const [milestonesText, setMilestonesText] = React.useState("Open segregated wallet, Setup auto-deposit rule, Complete 50% target");

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName.trim()) return;

    const formattedMilestones = milestonesText.split(",").map(m => m.trim()).filter(m => m.length > 0);
    
    // Auto-create an AI recommendation based on category
    let aiRec = "Automate deposits of ₹1,500 monthly on payroll day into premium yield lockers.";
    if (goalCategory === "Emergency Fund") {
      aiRec = "Fiduciary Standard: Allocate 3-6 months of overhead before taking aggressive stock positions. Setup checking sweeps.";
    } else if (goalCategory === "Laptop Purchase") {
      aiRec = "Construct secondary sinking ledger line. Trim discretionary delivery food allocations to fast-track in 5 months.";
    } else if (goalCategory === "Education") {
      aiRec = "Consider tax-sheltered educational savings routes or zero-fee automated index deposits.";
    }

    const newGoal: WealthGoal = {
      id: `gl-${Date.now()}`,
      name: goalName,
      category: goalCategory,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      milestones: formattedMilestones,
      recommendation: aiRec,
      deadlineDate: deadlineDate
    };

    onAddGoal(newGoal);
    // Reset forms
    setGoalName("");
    setTargetAmount(50000);
    setCurrentAmount(0);
    setMilestonesText("Open isolated pocket, Setup auto sweeps, Accomplish 50% ratio");
    setShowAddForm(false);
  };

  const handleAdjustGoalAmount = (id: string, current: number, target: number) => {
    const input = prompt(`Adjust Current Savings Progress (Current: ₹${current.toLocaleString()} / Target: ₹${target.toLocaleString()}):`, String(current));
    if (input === null) return;
    const num = Number(input);
    if (!isNaN(num) && num >= 0 && num <= target) {
      onUpdateGoalProgress(id, num);
    } else {
      alert("Please enter a valid numeric value matching targets limits.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-8 text-white">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#232323] pb-6">
        <div>
          <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Wealth Studio</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">Asset Architect</h1>
          <p className="text-xs text-gray-400 mt-2">Isolate atomic asset buckets, track progression milestones, and deploy automated sinking reserves.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>{showAddForm ? "Collapse Studio" : "Establish New Goal"}</span>
        </button>
      </header>

      {/* Goal submission form */}
      {showAddForm && (
        <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 mb-8 max-w-2xl">
          <h3 className="text-lg font-bold font-sans mb-1">Define Asset Objective Target</h3>
          <p className="text-xs text-gray-400 mb-6">Setup isolated milestones and enable AI fiduciary compliance scanners for optimum rate progression.</p>

          <form onSubmit={handleCreateGoal} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 block mb-1.5 uppercase">Goal Descriptor Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. MacBook Pro M4 Core" 
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#232323] p-2.5 rounded-lg text-white font-sans focus:outline-none focus:border-[#D8F275]"
                  required
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1.5 uppercase">Goal Category</label>
                <select 
                  value={goalCategory}
                  onChange={(e) => setGoalCategory(e.target.value as any)}
                  className="w-full bg-[#0B0B0B] border border-[#232323] p-2.5 rounded-lg text-white font-sans focus:outline-none"
                >
                  <option value="Emergency Fund">Emergency Fund</option>
                  <option value="Laptop Purchase">Laptop Purchase</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Custom Goal">Custom Goal</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-400 block mb-1.5 uppercase">Target Amount (₹)</label>
                <input 
                  type="number" 
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  className="w-full bg-[#0B0B0B] border border-[#232323] p-2.5 rounded-lg text-white focus:outline-none focus:border-[#D8F275]"
                  min={1}
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1.5 uppercase">Initial Deposit (₹)</label>
                <input 
                  type="number" 
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(Number(e.target.value))}
                  className="w-full bg-[#0B0B0B] border border-[#232323] p-2.5 rounded-lg text-white focus:outline-none focus:border-[#D8F275]"
                  min={0}
                />
              </div>

              <div>
                <label className="text-gray-400 block mb-1.5 uppercase">Target Deadline</label>
                <input 
                  type="date" 
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="w-full bg-[#0B0B0B] border border-[#232323] p-2.5 rounded-lg text-white font-sans focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 block mb-1.5 uppercase">Goal Milestones (comma separated)</label>
              <input 
                type="text" 
                value={milestonesText}
                onChange={(e) => setMilestonesText(e.target.value)}
                className="w-full bg-[#0B0B0B] border border-[#232323] p-2.5 rounded-lg text-white font-sans focus:outline-none focus:border-[#D8F275]"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button 
                type="submit"
                className="px-4 py-2.5 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg font-sans cursor-pointer transition-all"
              >
                Assemble Goal Locker
              </button>
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 bg-[#111111] border border-[#232323] hover:bg-zinc-800 font-semibold rounded-lg font-sans cursor-pointer text-gray-400 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((g) => {
          const ratio = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
          
          return (
            <div 
              key={g.id} 
              className="bg-[#111111] border border-[#232323] hover:border-zinc-800 rounded-xl p-6 flex flex-col justify-between transition-all group"
            >
              {/* Header card details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/40 text-gray-300 font-mono text-[9px] uppercase tracking-wider block w-max">
                      {g.category}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2 group-hover:text-[#D8F275] transition-all font-sans">{g.name}</h3>
                  </div>
                  
                  {/* Remove target trash icon */}
                  <button 
                    onClick={() => onDeleteGoal(g.id)}
                    className="p-1.5 text-gray-500 hover:text-red-400 rounded hover:bg-red-500/10 cursor-pointer transition-colors shrink-0"
                    title="Liquidate Goal locker"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar numerical */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-sans">Accumulated ratio</span>
                    <span className="text-[#D8F275] font-mono font-bold">{ratio}%</span>
                  </div>
                  
                  {/* Gauge bar */}
                  <div className="w-full bg-[#1e1e1e] rounded-full h-2 overflow-hidden border border-[#232323]">
                    <div 
                      className="bg-gradient-to-r from-[#D8F275] to-[#B7FF4A] h-full rounded-full transition-all duration-500"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-white font-bold">₹{g.currentAmount.toLocaleString()}</span>
                    <span className="text-gray-500">Target of ₹{g.targetAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Milestones list map */}
                <div className="pt-3 border-t border-[#232323]/60 space-y-2">
                  <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">CHECKPOINT MILESTONES</span>
                  <div className="space-y-1.5">
                    {g.milestones.map((mil, idx) => {
                      // Simulate completed milestone if we have progress
                      const isMilestoneDone = (idx === 0 && ratio > 10) || (idx === 1 && ratio >= 50) || (idx === 2 && ratio >= 99);
                      
                      return (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                            isMilestoneDone ? "text-green-400" : "text-gray-600"
                          }`} />
                          <span className={isMilestoneDone ? "line-through text-gray-500" : ""}>{mil}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recommendations and adjust controllers bottom block */}
              <div className="mt-6 pt-4 border-t border-[#232323] space-y-4">
                <div className="p-3 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                  <span className="text-[9px] text-[#D8F275] font-mono uppercase tracking-wider block font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D8F275]" />
                    <span>AI COMPLIANCE ACTION</span>
                  </span>
                  <p className="text-[11px] text-gray-400 leading-normal font-sans mt-1">{g.recommendation}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Until {g.deadlineDate || "unspecified"}</span>
                  </span>

                  <button 
                    onClick={() => handleAdjustGoalAmount(g.id, g.currentAmount, g.targetAmount)}
                    className="text-xs font-semibold text-[#D8F275] hover:underline cursor-pointer flex items-center gap-0.5"
                  >
                    <span>Fund Account</span>
                    <TrendingUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="col-span-full border border-dashed border-[#232323] bg-[#0B0B0B] p-12 rounded-xl text-center">
            <Target className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-300">No active wealth lockers established</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
              Use 'Establish New Goal' in the upper corner to structure and isolate automated capital portfolios safely.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
