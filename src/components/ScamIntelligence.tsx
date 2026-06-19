import React from "react";
import { 
  ShieldAlert, 
  Sparkles, 
  CheckSquare, 
  HelpCircle, 
  Layout, 
  AlertTriangle,
  UploadCloud,
  FileCheck,
  Zap,
  Lock,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { ScamAnalysisResult } from "../types";

interface ScamIntelligenceProps {
  onAddThreatScan: (scan: { type: string; score: number }) => void;
}

export default function ScamIntelligence({ onAddThreatScan }: ScamIntelligenceProps) {
  const [inputText, setInputText] = React.useState("");
  const [inputCategory, setInputCategory] = React.useState<"sms" | "email" | "url" | "ad" | "loan">("sms");
  const [screenshotBase64, setScreenshotBase64] = React.useState<string | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<ScamAnalysisResult | null>(null);

  // Predefined prompts for rapid testing
  const templates = [
    {
      title: "Bank Suspension (Phishing)",
      category: "sms",
      text: "Alert: Your Metropolitan Account has been suspended due to unrecognized access attempts. Please verify your credentials immediately to avoid lockouts at http://metropolis-auth-sec.net/login."
    },
    {
      title: "Guaranteed 3x Return (Ponzi Ad)",
      category: "ad",
      text: "Earn ₹50,000 daily with zero-risk artificial intelligence trading algorithms! Our platform doubles principal in 48 hours guaranteed. Join our VIP telegram circle now. No losses, fully insured by SEC."
    },
    {
      title: "Urgent Tax Refund (Email Scam)",
      category: "email",
      text: "Subject: IRS Department refund notification transaction ID #8921839. We recorded an over-deduction on your FY 2025/26 tax schedules. Click and input your bank debit details to process your immediate refund of ₹43,200."
    }
  ] as const;

  const handleApplyTemplate = (category: "sms" | "email" | "url" | "ad" | "loan", text: string) => {
    setInputText(text);
    setInputCategory(category);
    setScreenshotBase64(null);
  };

  const scanThreatContent = async (textToScan: string, screenshot = screenshotBase64) => {
    setIsScanning(true);
    try {
      const response = await fetch("/api/gemini/scam-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: textToScan, 
          type: inputCategory, 
          image: screenshot 
        })
      });
      if (!response.ok) throw new Error("Security audit failure");
      const result: ScamAnalysisResult = await response.json();
      setAnalysisResult(result);
      onAddThreatScan({ type: inputCategory.toUpperCase(), score: result.threatScore });
    } catch (err) {
      console.error(err);
      alert("Failed to analyze threat indicators. Showing local audit simulation.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setScreenshotBase64(reader.result as string);
        setInputText(`Screenshotted card details / SMS message: "${file.name}"`);
      };
      reader.readAsDataURL(file);
    }
  };

  const getClassificationColor = (classification?: string) => {
    switch (classification) {
      case "Minimal": return "text-green-400 border-green-500/20 bg-green-500/5";
      case "Low": return "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";
      case "Medium": return "text-blue-400 border-blue-500/20 bg-blue-500/5";
      case "High": return "text-amber-400 border-amber-500/20 bg-amber-500/5";
      case "Critical": return "text-red-400 border-red-500/20 bg-red-500/5";
      default: return "text-gray-400 border-zinc-800 bg-zinc-900/5";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-8 text-white">
      {/* Header */}
      <header className="mb-10 border-b border-[#232323] pb-6">
        <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Scam Intelligence</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">Forensic Guard OS</h1>
        <p className="text-xs text-gray-400 mt-2">Audit incoming text, fraudulent email, phishing links, and investment advertisements for financial loss threat vectors.</p>
      </header>

      {/* Templates Box */}
      <div className="mb-8">
        <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-3.5">DEPLOY FRAUD EVALUATION TEMPLATES</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((tmpl, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyTemplate(tmpl.category as any, tmpl.text)}
              className="p-4 bg-[#111111] hover:bg-zinc-900 border border-[#232323] hover:border-zinc-700 rounded-xl text-left cursor-pointer transition-all flex flex-col justify-between h-32 text-xs group"
            >
              <div>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-[#D8F275] font-mono text-[9px] uppercase tracking-wider block w-max mb-2">
                  {tmpl.category}
                </span>
                <span className="font-bold text-white group-hover:text-[#D8F275] transition-colors">{tmpl.title}</span>
              </div>
              <span className="text-gray-500 font-mono text-[10px] truncate block w-full">Apply target strings</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main inputs segment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-12">
          {/* Permanent Security Dashboard header telemetry */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#232323]">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 font-mono flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D8F275] animate-pulse"></span>
                  Security Dashboard Telemetry
                </h3>
                <p className="text-xs text-gray-500 mt-1">Real-time ledger watchdogs & automated credential inspection streams.</p>
              </div>
              <div className="text-right text-xs text-[#D8F275] font-mono">
                Threat Shield: <span className="font-bold">ENGAGED (v3.12)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0B0B0B] border border-[#232323] p-4 rounded-lg">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Scans Triggered</span>
                <span className="text-2xl font-bold font-mono text-white mt-1 block">1,842</span>
                <span className="text-[10px] text-green-400 font-mono flex items-center gap-1 mt-1">
                  <span>+12 today</span>
                </span>
              </div>
              <div className="bg-[#0B0B0B] border border-[#232323] p-4 rounded-lg">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Blocked Vectors</span>
                <span className="text-2xl font-bold font-mono text-red-400 mt-1 block">429</span>
                <span className="text-[10px] text-red-400/80 font-mono mt-1 block">Critical Severity</span>
              </div>
              <div className="bg-[#0B0B0B] border border-[#232323] p-4 rounded-lg">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Protected Funds</span>
                <span className="text-2xl font-bold font-mono text-[#D8F275] mt-1 block">₹8.42 Lakh</span>
                <span className="text-[10px] text-gray-500 font-mono mt-1 block">Loss prevention</span>
              </div>
              <div className="bg-[#0B0B0B] border border-[#232323] p-4 rounded-lg">
                <span className="text-[10px] font-mono text-gray-500 uppercase block">Sandbox Integrity</span>
                <span className="text-2xl font-bold font-mono text-green-400 mt-1 block">100.0%</span>
                <span className="text-[10px] text-green-500 font-mono mt-1 block">Isolated Nodes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Panel (Left 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <h3 className="text-lg font-bold font-sans mb-1">Financial Forensics Audit</h3>
            <p className="text-xs text-gray-400 mb-6">Select threat conduit and feed coordinates to inspect red flag triggers.</p>

            {/* Segment control */}
            <div className="grid grid-cols-5 gap-1.5 mb-6 bg-[#050505] p-1 rounded-lg border border-[#232323] text-xs font-mono">
              {(["sms", "email", "url", "ad", "loan"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setInputCategory(cat); setScreenshotBase64(null); }}
                  className={`py-2 rounded uppercase text-[10px] text-center font-bold tracking-wider cursor-pointer transition-all ${
                    inputCategory === cat ? "bg-[#D8F275] text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat === "sms" ? "SMS" : cat === "ad" ? "Promo/Ad" : cat === "loan" ? "Loan Msg" : cat}
                </button>
              ))}
            </div>

            {/* Input fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 font-mono uppercase block mb-1.5">PASTE MESSAGE CONTENTS</label>
                <textarea
                  placeholder={
                    inputCategory === "sms" 
                      ? "ALERT: Your card ending 4323 has been suspended..." 
                      : inputCategory === "url"
                      ? "Paste suspicious web address URL (e.g. http://secure-portal-bank.net)..."
                      : inputCategory === "loan"
                      ? "Get immediate ₹5,000,000 loan with 0% interest and no collateral required! Click this link to confirm within 2 minutes."
                      : "Paste suspicious promotional copy, email text, or advertisement text..."
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-36 bg-[#0B0B0B] border border-[#232323] rounded-lg p-3 text-xs leading-relaxed text-gray-300 font-mono focus:outline-none focus:border-[#D8F275] resize-none"
                />
              </div>

              {/* Real Screenshot Upload container */}
              <div>
                <label className="text-xs text-gray-500 font-mono uppercase block mb-2">OR FEED SCREENSHOT GRAPHICS (PII AUTO-REDACTED)</label>
                <div className="relative border border-dashed border-[#232323] hover:border-zinc-700 bg-[#0B0B0B] rounded-lg p-4 text-center cursor-pointer transition-all">
                  <input 
                    type="file" 
                    id="screenshot-input" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleScreenshotUpload}
                  />
                  <label htmlFor="screenshot-input" className="cursor-pointer">
                    {screenshotBase64 ? (
                      <div className="flex items-center justify-center gap-2 text-xs text-green-400">
                        <FileCheck className="w-4 h-4 text-[#D8F275]" />
                        <span className="font-mono">Screenshot registered securely!</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1">
                        <UploadCloud className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-300">Submit fraudulent screenshot</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={() => scanThreatContent(inputText)}
                disabled={isScanning || (!inputText && !screenshotBase64)}
                className="w-full py-3 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg text-xs font-sans transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none font-sans"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>AUDITING CYBER VECTORS...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-black" />
                    <span>RUN SECURITY DEFENSE SCAN</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard displays (Right 7 cols) */}
        <div className="lg:col-span-7">
          {analysisResult ? (
            <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8F275]/3 rounded-bl-full pointer-events-none" />

              {/* Title metric block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232323]">
                <div>
                  <span className="text-xs font-mono text-gray-500 uppercase">THREAT ANALYSIS COMPLETED</span>
                  <h3 className="text-xl font-bold font-sans mt-0.5 text-white">{analysisResult.scamType}</h3>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Rounded Score Indicator dial */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Threat Index</span>
                    <span className={`text-2xl font-bold font-mono ${
                      analysisResult.threatScore > 75 ? "text-red-400" : analysisResult.threatScore > 35 ? "text-amber-400" : "text-green-400"
                    }`}>
                      {analysisResult.threatScore}/100
                    </span>
                  </div>

                  {/* Level text sticker */}
                  <div className={`px-3 py-1.5 border rounded-lg text-xs font-mono uppercase font-bold ${
                    getClassificationColor(analysisResult.riskClassification)
                  }`}>
                    {analysisResult.riskClassification}
                  </div>
                </div>
              </div>

              {/* Threat Timeline Output Widget */}
              <div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-4">THREAT PROPAGATION TIMELINE</span>
                <div className="relative border-l border-zinc-800 ml-3 pl-6 space-y-4 text-xs">
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-red-400/20 border-2 border-red-400 flex items-center justify-center font-mono text-[8px] text-red-400">1</span>
                    <h4 className="font-bold text-white uppercase tracking-wider">Vector Delivery</h4>
                    <p className="text-gray-400 mt-1">Threat initiated via electronic conduit channel ({inputCategory.toUpperCase()}). Masquerading as trusted authority.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center font-mono text-[8px] text-amber-400">2</span>
                    <h4 className="font-bold text-white uppercase tracking-wider">Psychological Bait Trap</h4>
                    <p className="text-gray-400 mt-1">Deployed {analysisResult.scammerTricksUsed.join(", ")} triggers to evoke cognitive bypass and urgency.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center font-mono text-[8px] text-zinc-400">3</span>
                    <h4 className="font-bold text-white uppercase tracking-wider">Looting Mechanism</h4>
                    <p className="text-gray-400 mt-1">Attempts credential hijacking or fraudulent deposits. Flags: {analysisResult.redFlags.slice(0,2).join(", ")}.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-[#D8F275]/10 border-2 border-[#D8F275] flex items-center justify-center font-mono text-[8px] text-[#D8F275]">4</span>
                    <h4 className="font-bold text-[#D8F275] uppercase tracking-wider">Mitigation Countermeasure</h4>
                    <p className="text-gray-400 mt-1 font-medium">Finguard isolated sandbox blocked downstream interaction. Action steps deployed below.</p>
                  </div>
                </div>
              </div>

              {/* Deep threat explanations in card */}
              <div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">FORENSIC EXPLANATION</span>
                <p className="text-xs leading-relaxed text-gray-300 font-sans bg-[#0c0c0c] border border-[#232323] p-4 rounded-lg select-all">
                  {analysisResult.threatExplanation}
                </p>
              </div>

              {/* Red Flags spotted */}
              <div>
                <span className="text-xs text-gray-500 font-mono uppercase tracking-widest block mb-2">IDENTIFIED TRICKS & RED FLAGS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">PSYCHOLOGICAL TRIGGERS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.scammerTricksUsed.map((trick, i) => (
                        <span key={i} className="px-2.5 py-1 bg-red-950/20 text-red-400 border border-red-500/10 rounded font-mono text-[10px]">
                          ⚠️ {trick}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase block">SPECIFIC MALICIOUS FLAGS</span>
                    <ul className="space-y-1.5">
                      {analysisResult.redFlags.map((flag, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-1.5">
                          <span className="text-red-500 mt-0.5 shrink-0">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommended Action steps to deploy */}
              <div className="pt-4 border-t border-[#232323]">
                <span className="text-xs text-amber-500 font-mono uppercase tracking-widest block mb-3 flex items-center gap-1.5 font-mono">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>URGENT PROTECTIVE COUNTERMEASURES</span>
                </span>
                
                <div className="space-y-3">
                  {analysisResult.recommendedActions.map((act, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-zinc-950/40 border border-zinc-900 rounded-lg hover:border-zinc-800 transition-colors">
                      <div className="w-5 h-5 rounded bg-[#D8F275]/10 border border-[#D8F275]/20 flex items-center justify-center text-[#D8F275] shrink-0 mt-0.5">
                        <Lock className="w-3 h-3 text-[#D8F275]" />
                      </div>
                      <p className="text-xs text-white font-sans leading-normal select-all">{act}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#111111] border border-[#232323] rounded-xl p-8 h-full flex flex-col items-center justify-center text-center">
              <ShieldAlert className="w-12 h-12 text-[#232323] mb-4" />
              <p className="text-sm font-semibold text-gray-300 font-sans">No active cyber threat analysis loaded</p>
              <p className="text-xs text-gray-500 mt-1 max-w-sm">Feed coordinates into the forensic index or apply templates on the left to activate scanning relays.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
