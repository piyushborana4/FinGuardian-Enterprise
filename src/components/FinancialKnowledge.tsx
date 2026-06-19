import React from "react";
import { 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  HelpCircle, 
  Clock, 
  BookOpen,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export default function FinancialKnowledge() {
  const [activeModule, setActiveModule] = React.useState<"budgeting" | "taxes" | "insurance" | "mutual_funds" | "investments" | "retirement" | "credit">("budgeting");
  const [learningScore, setLearningScore] = React.useState(68);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [quizAnswer, setQuizAnswer] = React.useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);

  const modules = {
    budgeting: {
      title: "Tactical Budgeting & Asset Splitting",
      icon: "📊",
      duration: "12 min read",
      level: "Beginner",
      summary: "Understand capital distributions, structural allocations (50/30/20), and sinking reserves pipelines.",
      fullText: `### 1. The Fiduciary Budget Standard (50/30/20)
To establish structural wealth acceleration, direct capital into three primary channels:
* **The Essentials (50%)**: Food staples, primary mortgage/interest commitments, utility grids, and crucial medications.
* **The Discretionaries (30%)**: Quality-of-life adjustments, quick restaurants, software subscriptions, travel schemes, and entertainment.
* **Strategic Assets (20%)**: Compounds index funds, automated sinking funds, emergency fund allocations, and credit payoffs.

### 2. Sinking Funds Isolation
Rather than taking high-friction short-term debt, establish an atomic 'Sinking Fund' bucket for predictable lumpy purchases (e.g., computers, travel fares). Space out savings parameters safely to minimize liquidity disruptions.`,
      quiz: {
        question: "What percentage of capital should be allocated to Essentials under the 50/30/20 framework?",
        options: ["20%", "30%", "50%", "70%"],
        correctIndex: 2,
        explanation: "Correct! The standard allocations under 50/30/20 directs 50% to essential needs, 30% to wants, and 20% directly into strategic compounding vehicles."
      }
    },
    taxes: {
      title: "Wealth Preservation & Tax Mitigation",
      icon: "🏛️",
      duration: "18 min read",
      level: "Intermediate",
      summary: "Learn legal deductions structures, sovereign retirement vehicles (EPF/PPF/80C), tax bracket optimizations, and gains accounting.",
      fullText: `### 1. Sovereign Multi-tier Deductions
Every government establishes code paths allowing citizens to shelter income in long-term infrastructure loops. In modern plans:
* **EPF / PPF Schemes**: Secure up to statutory limits annually, compounding completely tax-sheltered.
* **Equity Linked Savings (ELSS)**: Blends diversified index holdings with immediate tax deduction allowances.

### 2. Long-term vs. Short-term Capital Gains (LTCG vs STCG)
Discharging equity holdings in less than 365 days triggers high marginal income tax brackets. Structuring holding schedules to exceed one year unlocks preferential LTCG brackets, preserving up to 15% of aggregate harvest values.`,
      quiz: {
        question: "Holding assets for more than 12 months before equity discharge primarily triggers which tax protocol?",
        options: ["STCG (Short-term)", "LTCG (Long-term) preferential rates", "Standard Marginal Income tax", "MFA Penalty tax"],
        correctIndex: 1,
        explanation: "Excellent! Holding assets beyond 12 months categorizes the gains under Long-Term Capital Gains (LTCG) which enjoy tax-favorable brackets compared to marginal income rates."
      }
    },
    insurance: {
      title: "Asset Shielding & Risk Administration",
      icon: "🛡️",
      duration: "14 min read",
      level: "Intermediate",
      summary: "Strategic risk deflection using solid term life covers, deductible buffers, and comprehensive medical indemnities.",
      fullText: `### 1. Risk Mitigation vs Risk Retention
If the potential loss of a capital vehicle exceeds your liquid runway, deflect the risk onto institutional counterparties:
* **Sovereign Term Life**: Acquire direct term protection covering 10-15x annual salary profiles. Fully avoid blended investment policies (e.g., ULIPs) which feature high fees and poor performance.
* **Comprehensive Health Insurance**: Secure standalone health umbrellas with sub-limit and co-pay exemptions to protect central capital accounts from medical shocks.`,
      quiz: {
        question: "Which insurance format is recommended by financial fiduciaries for pure life coverage?",
        options: ["Unit Linked Insurance Plans (ULIP)", "Whole Life Endowment Plans", "Term Insurance pure life cover", "Universal Variable Policies"],
        correctIndex: 2,
        explanation: "Correct! Term insurance is the standard fiduciary choice—it features the lowest expense profiles and guarantees absolute pure protection without expensive, poor-performing investment wrappers."
      }
    },
    mutual_funds: {
      title: "Mutual Funds & Basket Vehicles",
      icon: "🏦",
      duration: "15 min read",
      level: "Beginner",
      summary: "Understand active vs passive mutual funds, Expense Ratios coefficient, Direct vs Regular routes, and index categorization.",
      fullText: `### 1. Active vs. Passive Mutual Funds
Passive index mutual funds track standard baskets of markets without subjective human managers. Active mutual funds charge significant overhead commissions (up to 2% annually) to attempt to beat the market, which 90%+ fail to do over any 10-year span.
* **Direct Growth Plans**: Avoid intermediaries completely to save on commission outlays, which compounding yields over decades can increase by up to 25% of final portfolio balances.
* **The Expense Ratio Factor**: Keep Expense Ratios beneath 0.3% for maximum efficiency preservation.

### 2. Diversified Category Selection
Split exposures into large-cap, mid-cap, and sector-agnostic multi-cap baskets according to systemic risk tolerance parameters. Always prioritize growth option schemes rather than dividend payback channels which incur heavy tax outlays.`,
      quiz: {
        question: "Why should strategic long-term investors favor Passive Index Mutual funds over Active Multi-cap counterparts?",
        options: [
          "They offer higher insurance paybacks",
          "They bypass costly active manager overhead commissions which sap compounding returns",
          "They are managed directly by tax enforcement agents",
          "They don't have any market equity asset backing"
        ],
        correctIndex: 1,
        explanation: "Correct! Passive Index Mutual Funds feature significantly lower expense ratios (often 0.1-0.2% vs active 1.5-2.5%), which prevents massive drag on your long-term compounded growth."
      }
    },
    investments: {
      title: "Asset Allocation & Portfolio Theory",
      icon: "📈",
      duration: "20 min read",
      level: "Advanced",
      summary: "Mitigate volatility via diversified equity allocations, direct indices, dollar-cost average schemes, and bonds.",
      fullText: `### 1. Systematic Diversification
Do not attempt to pick individual stocks. Academic empirical finance proves that 96% of active fund managers underperform broad market tracking indices over a 15-year horizon:
* **Direct Equity Indices**: Gain atomic exposure to top sovereign corporations through low-expense Nifty, S&P 500, or aggregate Global ETFs.
* **Dollar Cost Averaging (DCA)**: Allocate fixed quotas monthly. This automatically acquires more shares during market contractions, lowering aggregate average cost basis over historical horizons.`,
      quiz: {
        question: "Which strategy lowers purchase volatility by investing fixed sums of money regularly?",
        options: ["Sovereign options trading", "Systematic Dollar Cost Averaging (DCA)", "Day-trading margin shorts", "High-frequency arbitrage"],
        correctIndex: 1,
        explanation: "Spot-on! Dollar Cost Averaging (DCA / SIP) reduces purchase cost volatility by auto-settling identical capital quotas weekly or monthly."
      }
    },
    retirement: {
      title: "Retirement Math & Compounding Velocity",
      icon: "⏳",
      duration: "16 min read",
      level: "Advanced",
      summary: "Build retirement runway estimations using variables compounding calculators and the 4% Withdrawal Rule.",
      fullText: `### 1. The F.I.R.E. Threshold Number
Financial Independence, Retire Early (FIRE) metrics define your retirement target as 25x your annual household expenses:
* **The 4% Safe Withdrawal Rule**: Historical treasury back-testing illustrates that withdrawing 4% (inflation-adjusted) of your initial retirement corpus annually guarantees a 95% portfolio survival rate over a 30-year span.
* **Corpus compounding velocity**: Every 7.2 years, your principal is projected to double assuming standard 10% average nominal market returns.`,
      quiz: {
        question: "Under the FIRE threshold model, how many times your annual expenditures should your target retirement corpus be?",
        options: ["5x annual expenses", "10x annual expenses", "25x annual expenses", "100x annual expenses"],
        correctIndex: 2,
        explanation: "Correct! The FIRE threshold calculates 25x annual expenses as the benchmark target corpus, which corresponds to the 4% safe withdrawal metric."
      }
    },
    credit: {
      title: "Credit Score & Payment Integrity",
      icon: "💳",
      duration: "10 min read",
      level: "Beginner",
      summary: "Achieve optimal credit profiles, analyze bureaus reports, and prevent debt traps.",
      fullText: `### 1. Credit Bureaus Mechanics
Your credit bureau score (CIBIL / Experian) dictates borrowing cost ratios for mortgages. The primary drivers are:
* **Payment History (35%)**: Keep zero late payments. Auto-settle minimum or full balances.
* **Credit Utilization Ratio (30%)**: Keep outstanding credit balances under 30% of aggregate limits to signal low reliance on external capital.`,
      quiz: {
        question: "What is the recommended maximum Credit Utilization Ratio to maintain optimal score profiles?",
        options: ["30%", "60%", "85%", "100%"],
        correctIndex: 0,
        explanation: "Correct! Maintaining credit card balances below 30% of total limits signals high repayment capability to credit scoring algorithms."
      }
    }
  } as const;

  const handleSelectModule = (mod: keyof typeof modules) => {
    setActiveModule(mod);
    setShowQuiz(false);
    setQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleQuizSubmit = (index: number) => {
    setQuizAnswer(index);
    setQuizSubmitted(true);
    if (index === modules[activeModule].quiz.correctIndex) {
      setLearningScore(prev => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-8 text-white">
      {/* Header */}
      <header className="mb-10 border-b border-[#232323] pb-6">
        <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Knowledge Center</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">Fiduciary Academy</h1>
        <p className="text-xs text-gray-400 mt-2">Acquire essential financial competency, check compliance targets, and test system literacy.</p>
      </header>

      {/* Main Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left selector menu (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Progress Widget */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-5">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">FINANCIAL SKILL QUOTIENT</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold font-mono text-[#D8F275]">{learningScore}/100</span>
              <Award className="w-5 h-5 text-[#D8F275]" />
            </div>
            <div className="w-full bg-[#1e1e1e] rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#D8F275] to-[#B7FF4A] h-full rounded-full transition-all duration-300"
                style={{ width: `${learningScore}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-500 font-sans mt-2.5 leading-normal">
              Pass academic course quizzes on the right to elevate your tactical asset management accreditation rank.
            </p>
          </div>

          {/* AI-Generated Learning Recommendations */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-5 space-y-4">
            <h4 className="text-[10px] font-mono text-[#D8F275] uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Study Recommendations</span>
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                <span className="text-[9px] font-mono text-amber-500 block uppercase font-semibold">CORE FOCUS</span>
                <span className="text-xs font-bold text-white block mt-1">Tax Harvest Structuring</span>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">You haven't reviewed LTCG exemptions in the current window. Bypassing 15% outlays is highly critical.</p>
                <button onClick={() => handleSelectModule("taxes")} className="text-[#D8F275] text-[9px] font-mono hover:underline mt-2.5 block uppercase font-bold cursor-pointer">INSPECT MODULE →</button>
              </div>
              <div className="p-3 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                <span className="text-[9px] font-mono text-green-400 block uppercase font-semibold">HIGH IMPACT</span>
                <span className="text-xs font-bold text-white block mt-1">Passive Index Vehicles</span>
                <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">Expense ratio coefficients significantly protect compound yield. We recommend reviewing Mutual Funds.</p>
                <button onClick={() => handleSelectModule("mutual_funds")} className="text-[#D8F275] text-[9px] font-mono hover:underline mt-2.5 block uppercase font-bold cursor-pointer">INSPECT MODULE →</button>
              </div>
            </div>
          </div>

          {/* Core Modules buttons */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-4 space-y-2">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block px-2.5 mb-3">CURRICULUM COURSES</span>
            
            {(Object.keys(modules) as Array<keyof typeof modules>).map((key) => {
              const mod = modules[key];
              const isActive = activeModule === key;

              return (
                <button
                  key={key}
                  onClick={() => handleSelectModule(key)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-lg text-left cursor-pointer transition-all ${
                    isActive ? "bg-[#D8F275] text-black" : "text-gray-300 hover:bg-[#151515]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{mod.icon}</span>
                    <div>
                      <span className={`block text-xs font-bold leading-normal ${isActive ? "text-black" : "text-white"}`}>
                        {mod.title}
                      </span>
                      <span className={`text-[10px] block font-mono mt-0.5 ${isActive ? "text-black/60" : "text-gray-400"}`}>
                        {mod.duration} • {mod.level}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "text-black" : "text-gray-500"}`} />
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Study & Quiz desk (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 space-y-6">
            
            {/* Textbook study zone */}
            <div className="border-b border-[#232323]/60 pb-6">
              <div className="flex items-center gap-2 text-[#D8F275] text-xs font-mono uppercase">
                <BookOpen className="w-4 h-4" />
                <span>Textbook Module</span>
              </div>
              <h2 className="text-xl font-bold font-sans text-white mt-1.5">{modules[activeModule].title}</h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{modules[activeModule].summary}</p>
            </div>

            <div className="prose prose-invert max-w-none text-xs leading-relaxed text-gray-300 font-sans space-y-5 select-all">
              {modules[activeModule].fullText.split("\n\n").map((para, idx) => {
                if (para.startsWith("###")) {
                  return <h3 key={idx} className="text-sm font-bold text-white mb-2 mt-4">{para.replace("###", "").trim()}</h3>;
                }
                if (para.startsWith("*")) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-2">
                      {para.split("\n").map((line, lIdx) => (
                        <li key={lIdx} className="text-xs text-gray-300">{line.replace("*", "").trim()}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx} className="text-xs text-gray-400 leading-loose">{para.trim()}</p>;
              })}
            </div>

            {/* Quiz panel trigger */}
            <div className="pt-6 border-t border-[#232323]">
              {!showQuiz ? (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full py-3 bg-[#1e1e1e] hover:bg-zinc-800 border border-[#232323] rounded-lg text-xs font-semibold text-[#D8F275] hover:text-[#B7FF4A] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Initiate Competency Evaluation Quiz</span>
                </button>
              ) : (
                <div className="bg-[#0B0B0B] border border-[#232323] p-5 rounded-lg space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-500">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>MODULE STUDY CHALLENGE</span>
                  </div>

                  <h3 className="text-xs font-bold font-sans text-white leading-normal">
                    {modules[activeModule].quiz.question}
                  </h3>

                  <div className="space-y-2.5">
                    {modules[activeModule].quiz.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === modules[activeModule].quiz.correctIndex;
                      const isSelected = quizAnswer === oIdx;

                      let optStyle = "bg-[#111111] border-[#232323] hover:border-zinc-700 hover:bg-[#151515] text-gray-300";
                      if (quizSubmitted) {
                        if (isCorrect) {
                          optStyle = "bg-green-500/10 border-green-500/20 text-green-300";
                        } else if (isSelected) {
                          optStyle = "bg-red-500/10 border-red-500/20 text-red-300";
                        } else {
                          optStyle = "bg-[#0b0b0b] border-zinc-900 text-gray-500 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizSubmit(oIdx)}
                          className={`w-full p-3 border text-xs text-left rounded-lg cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                        >
                          <span className="font-sans font-medium">{opt}</span>
                          {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-green-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-4 bg-[#111111] border border-[#232323] rounded-lg">
                      <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">FIDUCIARY EXPLANATION</span>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        {modules[activeModule].quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
