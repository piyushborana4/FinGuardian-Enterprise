import React from "react";
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  Cpu, 
  Smartphone,
  Eye,
  EyeOff,
  UserCheck,
  Bot,
  RefreshCw,
  LogOut,
  ArrowRight
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import FinancialCommandCenter from "./components/FinancialCommandCenter";
import LedgerIntelligence from "./components/LedgerIntelligence";
import ScamIntelligence from "./components/ScamIntelligence";
import FinancialCopilot from "./components/FinancialCopilot";
import WealthPlanning from "./components/WealthPlanning";
import WealthProjection from "./components/WealthProjection";
import FinancialKnowledge from "./components/FinancialKnowledge";
import SecurityCenter from "./components/SecurityCenter";
import Settings from "./components/Settings";
import { NavTab, Transaction, LedgerAnalysisResult, WealthGoal, CopilotMessage, SecurityEventLog } from "./types";

export default function App() {
  // Session Authentication state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authEmail, setAuthEmail] = React.useState("piyushborana12@gmail.com");
  const [authPassword, setAuthPassword] = React.useState("••••••••••••••");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [mfaCode, setMfaCode] = React.useState("");
  const [showMfaInput, setShowMfaInput] = React.useState(false);

  // App Central states
  const [activeTab, setActiveTab] = React.useState<NavTab>("command_center");
  const [mfaEnabled, setMfaEnabled] = React.useState(true);
  const [securityScore, setSecurityScore] = React.useState(85);

  // Accessibility & Role States (WCAG 2.2 compliance & RBAC)
  const [highContrastMode, setHighContrastMode] = React.useState(false);
  const [screenReaderActive, setScreenReaderActive] = React.useState(false);
  const [activeUserRole, setActiveUserRole] = React.useState<"Fiduciary Master" | "Compliance Auditor" | "Risk Officer" | "Standard User">("Fiduciary Master");
  const [lastSpeechDescription, setLastSpeechDescription] = React.useState("Screen Reader is ready. Navigating FinGuardian Fiduciary Secure Workspace.");

  // Initial Security event logs
  const [logs, setLogs] = React.useState<SecurityEventLog[]>([
    { id: "log-1", timestamp: "06-18 23:39:03", event: "Enterprise cloud run container ingress routing established", status: "Completed", ipAddress: "10.244.0.12", device: "Cloud Run V4" },
    { id: "log-2", timestamp: "06-18 23:41:12", event: "TLS 1.3 handshake packet exchange completed", status: "Authorized", ipAddress: "162.254.206.18", device: "Safari macOS" },
    { id: "log-3", timestamp: "06-18 23:45:50", event: "AES-256 local storage key rotation completed", status: "Completed", ipAddress: "162.254.206.18", device: "Safari macOS" }
  ]);

  const addLog = (eventText: string, status: SecurityEventLog["status"]) => {
    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const dateString = new Date().toLocaleDateString([], { month: "2-digit", day: "2-digit" });
    const newLog: SecurityEventLog = {
      id: `log-${Date.now()}`,
      timestamp: `${dateString} ${timeString}`,
      event: eventText,
      status: status,
      ipAddress: "162.254.206.18",
      device: "Vite Sandbox Environment"
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Initial Wealth Goals
  const [goals, setGoals] = React.useState<WealthGoal[]>([
    {
      id: "gl-1",
      name: "Emergency Reserve Liquid",
      category: "Emergency Fund",
      targetAmount: 120000,
      currentAmount: 75000,
      milestones: ["Open separate High-Yield pocket", "Establish ₹50k runway", "Achieve absolute 3-months solvency"],
      recommendation: "Shield: Settle deposits of ₹5,000 monthly continuously to establish full security buffer.",
      deadlineDate: "2026-09-30"
    },
    {
      id: "gl-2",
      name: "Engineering Laptop Core M4",
      category: "Laptop Purchase",
      targetAmount: 85000,
      currentAmount: 15000,
      milestones: ["Structure MacBook sinking fund", "Trim Leisure allocations under 10%", "Release purchase payload"],
      recommendation: "Pacing: Divert current leisure dining outlays over the coming 4 operational months.",
      deadlineDate: "2026-11-15"
    }
  ]);

  // Initial Copilot chat history
  const [chatHistory, setChatHistory] = React.useState<CopilotMessage[]>([
    {
      id: "cop-1",
      role: "assistant",
      content: "### FinGuardian AI Fiduciary Assistant Activated\n\nGreetings! I am your strategic wealth advisor and cybersecurity defense co-pilot. I can help you structure custom household savings pathways, analyze transactional alert vectors, or audit corporate bank ledger allocations. How can I protect your capital surplus today?",
      timestamp: "11:39 PM"
    }
  ]);

  // Initial Scam analysis logs and score calculations
  const [threatScans, setThreatScans] = React.useState([
    { id: "ts-1", type: "SMS", score: 92, date: "06-18 20:12" },
    { id: "ts-2", type: "URL", score: 88, date: "06-18 21:05" },
    { id: "ts-3", type: "Email", score: 12, date: "06-18 22:40" }
  ]);

  const addThreatScan = (scan: { type: string; score: number }) => {
    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateString = new Date().toLocaleDateString([], { month: "2-digit", day: "2-digit" });
    const newScan = {
      id: `ts-${Date.now()}`,
      type: scan.type,
      score: scan.score,
      date: `${dateString} ${timeString}`
    };
    setThreatScans(prev => [newScan, ...prev]);
    addLog(`Performed ${scan.type} Scam Check (Threat Score: ${scan.score}%)`, scan.score > 70 ? "Warning" : "Scanned");
  };

  // Initial Statement Ledger analysis results
  const [ledgerResults, setLedgerResults] = React.useState<LedgerAnalysisResult>({
    transactions: [
      { id: "tx-demo-1", date: "2026-06-01", description: "Vanguard Direct Depot Payroll", category: "Salary", amount: 65000.00, type: "Credit" },
      { id: "tx-demo-2", date: "2026-06-02", description: "Metropolitan Corporate Landlord", category: "Housing", amount: 18000.00, type: "Debit" },
      { id: "tx-demo-3", date: "2026-06-05", description: "ConEd Utility Grid AutoPay", category: "Utilities", amount: 1450.20, type: "Debit" },
      { id: "tx-demo-4", date: "2026-06-06", description: "Whole Foods Market Premium", category: "Food", amount: 2280.40, type: "Debit" },
      { id: "tx-demo-5", date: "2026-06-10", description: "Chevron Premium Fueling LLC", category: "Transport", amount: 640.00, type: "Debit" },
      { id: "tx-demo-6", date: "2026-06-12", description: "Fidelity Dynamic Equity Fund", category: "Investment", amount: 15000.00, type: "Debit" }
    ],
    metrics: {
      totalCredit: 65000.00,
      totalDebit: 37370.60,
      savingsRate: 42.50,
      primaryIncomeSource: "Vanguard Direct Depot Payroll",
      topExpenseCategory: "Housing"
    },
    categoryShares: {
      Housing: 18000.00,
      Food: 2280.40,
      Utilities: 1450.20,
      Transport: 640.00,
      Leisure: 0.00,
      Investment: 15000.00
    },
    aiSummary: `### AI Intelligence Ledger Report
        
#### Key Strategic Strengths:
* **Exceptional Savings Rate**: You achieved a **42.50%** savings rate (calculated including your high-fidelity investment deposits of ₹15,000.00).
* **Zero Leisure Outflow**: Excellent spending discipline this billing cycle.

#### Tactical Recommendation:
Automate secondary transfers of ₹5,000 from salaries directly into high-yield accounts on **Day 1** of incoming credit.`
  });

  // Calculate global security score
  React.useEffect(() => {
    let score = 75;
    if (mfaEnabled) score += 10;
    if (goals.length > 2) score += 5;
    if (threatScans.length > 5) score += 5;
    setSecurityScore(Math.min(100, score));
  }, [mfaEnabled, goals, threatScans]);

  const speakText = React.useCallback((text: string) => {
    setLastSpeechDescription(text);
    if (screenReaderActive && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    }
  }, [screenReaderActive]);

  const handleInteractiveLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    speakText("Verifying credentials database using Firebase authentication engine...");
    
    setTimeout(() => {
      if (mfaEnabled && !showMfaInput) {
        setShowMfaInput(true);
        setIsAuthenticating(false);
        speakText("Credentials verified. Please input the 6-digit Multi-factor code sent to your biometric device.");
      } else {
        setIsAuthenticated(true);
        setIsAuthenticating(false);
        addLog("User session authenticated successfully via Firebase Auth proxy", "Authorized");
        speakText("Access approved. Welcome to FinGuardian core control center.");
      }
    }, 1500);
  };

  const handleVerifyMfaCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode === "123456" || mfaCode.length === 6) {
      setIsAuthenticating(true);
      speakText("Checking cryptographic token sequence on multi-factor device...");
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsAuthenticating(false);
        addLog("MFA Authenticator token verified successfully via Firebase Auth MFA", "Authorized");
        speakText("Multi-factor token verified. Security score is active. Welcome to FinGuardian.");
      }, 1000);
    } else {
      speakText("Error. Check input code coordinates.");
      alert("Invalid verification code coordinate. Use '123456' for rapid test pass.");
    }
  };

  const handleSsoLogin = (provider: string) => {
    setIsAuthenticating(true);
    speakText(`Opening secure OAuth 2.0 federated handshake with ${provider}...`);
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsAuthenticating(false);
      addLog(`SSO session established via OAuth 2.0 with ${provider}`, "Authorized");
      speakText(`Handshake completed. Securely logged in via ${provider} single sign-on.`);
    }, 1500);
  };

  // Render authentic Entrance security Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Ambient grids background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(216,242,117,0.06),transparent)] pointer-events-none" />
        
        <div className="w-full max-w-md bg-[#0B0B0B] border border-[#232323] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8F275]/3 rounded-bl-full pointer-events-none" />

          {/* Logo Brand */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#D8F275] flex items-center justify-center shadow-lg shadow-[#D8F275]/10 mx-auto mb-4">
              <Lock className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-bold font-sans tracking-tight">FinGuardian <span className="text-[#D8F275]">AI</span></h1>
            <p className="text-xs text-gray-400 mt-1 uppercase font-mono tracking-widest text-zinc-500">Secure Capital Access Gate</p>
          </div>

          {!showMfaInput ? (
            <form onSubmit={handleInteractiveLogin} className="space-y-4 text-xs font-mono">
              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase tracking-wider block">Credential Email</label>
                <input 
                  type="email" 
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full bg-[#111111] border border-[#232323] p-3 rounded-lg text-white font-sans text-sm focus:outline-none focus:border-[#D8F275]"
                  required
                />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-zinc-400 uppercase tracking-wider block">Security Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#111111] border border-[#232323] p-3 rounded-lg text-white font-sans text-sm pr-10 focus:outline-none focus:border-[#D8F275]"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 mt-2 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg font-sans text-xs flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-widest font-bold"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Verifying session...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Authorize Secure Session</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyMfaCode} className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-[#111111] rounded-lg border border-[#232323] text-center mb-4">
                <Smartphone className="w-6 h-6 text-[#D8F275] mx-auto mb-2" />
                <span className="text-[10px] text-[#D8F275] uppercase block font-bold mb-1">MFA CODE SENT</span>
                <p className="text-[11px] text-gray-400 leading-normal font-sans">
                  Enter the 6-digit authenticator pass printed on your paired phone simulation.
                </p>
                <p className="text-[10px] text-[#D8F275] bg-[#1a1c13] px-1.5 py-1 rounded w-max mx-auto mt-2 font-bold">
                  TEST KEY CAPTURE: 123456
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase tracking-wider block text-center">Enter 6-digit token</label>
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="123456"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  className="w-full bg-[#111111] border border-[#232323] p-3 text-center rounded-lg text-[#D8F275] font-mono text-xl tracking-widest focus:outline-none focus:border-[#D8F275]"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg font-sans text-xs flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-widest font-bold"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Tunnelling logs...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-black" />
                    <span>Verify Authenticated Token</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Federated OAuth 2.0 Single Sign-on integration */}
          {!showMfaInput && (
            <div className="mt-5 pt-5 border-t border-[#232323] space-y-3">
              <span className="text-[9px] uppercase text-zinc-500 tracking-wider block text-center font-mono">OAuth 2.0 Federated Identity Hub S.S.O.</span>
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-sans">
                <button
                  type="button"
                  onClick={() => handleSsoLogin("Google SSO")}
                  className="py-2.5 px-3 bg-[#111111] hover:bg-zinc-850 border border-[#232323] hover:border-zinc-700 rounded-lg text-gray-300 font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <span className="text-red-400 font-sans font-bold text-xs">G</span> Google OAuth
                </button>
                <button
                  type="button"
                  onClick={() => handleSsoLogin("Azure AD SSO")}
                  className="py-2.5 px-3 bg-[#111111] hover:bg-zinc-850 border border-[#232323] hover:border-zinc-700 rounded-lg text-gray-300 font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <span className="text-[#38bdf8] font-mono font-bold text-xs">⌘</span> Okta / Azure
                </button>
              </div>
            </div>
          )}

          {/* Accessibility Quick Controls */}
          <div className="mt-4 p-3 bg-[#111111]/60 border border-[#232323] rounded-lg flex items-center justify-between text-[10px] font-sans">
            <span className="text-zinc-500 font-mono">WCAG VOICE SCREEN ASSIST</span>
            <button
              type="button"
              onClick={() => {
                const nowActive = !screenReaderActive;
                setScreenReaderActive(nowActive);
                if (nowActive && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                  const utt = new SpeechSynthesisUtterance("Accessibility screen reader helper activated. Secure credentials login fields are prepared.");
                  window.speechSynthesis.speak(utt);
                }
              }}
              className={`px-2 py-1 rounded font-mono text-[9px] font-bold cursor-pointer transition-colors ${
                screenReaderActive ? "bg-[#D8F275] text-black" : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {screenReaderActive ? "VOICE ON" : "VOICE OFF"}
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-[#232323]/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>AES-256 / SHA3</span>
            <span>PORT 3000 INCUBATED</span>
          </div>

        </div>
      </div>
    );
  }

  // Render Main Layout of applet when authenticated
  const renderTabContent = () => {
    switch (activeTab) {
      case "command_center":
        return (
          <FinancialCommandCenter
            transactions={ledgerResults.transactions}
            savingsRate={ledgerResults.metrics.savingsRate}
            totalCredit={ledgerResults.metrics.totalCredit}
            totalDebit={ledgerResults.metrics.totalDebit}
            scamLogsCount={threatScans.length}
            threatScans={threatScans}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
      case "ledger":
        return (
          <LedgerIntelligence
            ledgerResults={ledgerResults}
            onUpdateLedger={(data) => {
              setLedgerResults(data);
              addLog(`Uploaded statement ledger parsed. Extracted ${data.transactions.length} rows.`, "Completed");
            }}
            isLoading={isAuthenticating}
            setIsLoading={setIsAuthenticating}
          />
        );
      case "scam_intelligence":
        return (
          <ScamIntelligence
            onAddThreatScan={addThreatScan}
          />
        );
      case "copilot":
        return (
          <FinancialCopilot
            chatHistory={chatHistory}
            onAddMessage={(msg) => setChatHistory(prev => [...prev, msg])}
            onClearHistory={() => {
              setChatHistory([]);
              addLog("Cleared Copilot convo logs safely", "Authorized");
            }}
            isLoading={isAuthenticating}
            setIsLoading={setIsAuthenticating}
          />
        );
      case "wealth_planning":
        return (
          <WealthPlanning
            goals={goals}
            onAddGoal={(g) => {
              setGoals(prev => [...prev, g]);
              addLog(`Established new Goal bucket: ${g.name}`, "Completed");
            }}
            onDeleteGoal={(id) => {
              const target = goals.find(g => g.id === id);
              setGoals(prev => prev.filter(g => g.id !== id));
              if (target) {
                addLog(`Liquidated savings locker: ${target.name}`, "Warning");
              }
            }}
            onUpdateGoalProgress={(id, num) => {
              setGoals(prev => prev.map(g => g.id === id ? { ...g, currentAmount: num } : g));
              addLog(`Adjusted portfolio balance metrics`, "Completed");
            }}
          />
        );
      case "wealth_projection":
        return <WealthProjection />;
      case "knowledge_center":
        return <FinancialKnowledge />;
      case "security":
        return (
          <SecurityCenter
            securityScore={securityScore}
            mfaEnabled={mfaEnabled}
            onToggleMfa={() => setMfaEnabled(!mfaEnabled)}
            logs={logs}
            onAddLog={addLog}
            activeUserRole={activeUserRole}
            setActiveUserRole={(role) => {
              setActiveUserRole(role);
              speakText(`Access permissions adjusted to ${role} role configuration.`);
            }}
            screenReaderActive={screenReaderActive}
            setScreenReaderActive={(val) => {
              setScreenReaderActive(val);
              speakText(val ? "Voice synthesising screen assistance active" : "Screen assistant turned off");
            }}
            lastSpeechDescription={lastSpeechDescription}
            highContrastMode={highContrastMode}
            setHighContrastMode={(val) => {
              setHighContrastMode(val);
              speakText(`High contrast visuals ${val ? "enabled" : "disabled"}.`);
            }}
            speakText={speakText}
          />
        );
      case "settings":
        return (
          <Settings
            onAddLog={addLog}
            activeUserRole={activeUserRole}
            setActiveUserRole={(role) => {
              setActiveUserRole(role);
              speakText(`Switched operational access token to ${role}.`);
            }}
            highContrastMode={highContrastMode}
            setHighContrastMode={(val) => {
              setHighContrastMode(val);
              speakText(`Visual theme set to ${val ? "High Contrast Amber Noir" : "Refined Fiduciary Charcoal"}`);
            }}
            screenReaderActive={screenReaderActive}
            setScreenReaderActive={(val) => {
              setScreenReaderActive(val);
              speakText(val ? "Synthetic screen narrative activated" : "Assistive voice disabled");
            }}
            speakText={speakText}
          />
        );
      default:
        return (
          <FinancialCommandCenter
            transactions={ledgerResults.transactions}
            savingsRate={ledgerResults.metrics.savingsRate}
            totalCredit={ledgerResults.metrics.totalCredit}
            totalDebit={ledgerResults.metrics.totalDebit}
            scamLogsCount={threatScans.length}
            threatScans={threatScans}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        );
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-150 ${highContrastMode ? "bg-black text-white" : "bg-[#050505] text-white"}`}>
      {/* Navigation sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        securityScore={securityScore}
        userEmail={authEmail}
      />
      
      {/* Content workspace panels */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
}
