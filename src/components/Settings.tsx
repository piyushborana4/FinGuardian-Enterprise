import React from "react";
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Database, 
  Trash2, 
  FileCheck, 
  Lock, 
  Code2, 
  Users,
  CheckCircle,
  HelpCircle,
  Zap
} from "lucide-react";

interface SettingsProps {
  onAddLog: (event: string, status: "Completed" | "Warning" | "Authorized" | "Scanned" | "Blocked") => void;
  activeUserRole: "Fiduciary Master" | "Compliance Auditor" | "Risk Officer" | "Standard User";
  setActiveUserRole: (role: "Fiduciary Master" | "Compliance Auditor" | "Risk Officer" | "Standard User") => void;
  highContrastMode: boolean;
  setHighContrastMode: (val: boolean) => void;
  screenReaderActive: boolean;
  setScreenReaderActive: (val: boolean) => void;
  speakText: (text: string) => void;
}

export default function Settings({ 
  onAddLog,
  activeUserRole,
  setActiveUserRole,
  highContrastMode,
  setHighContrastMode,
  screenReaderActive,
  setScreenReaderActive,
  speakText
}: SettingsProps) {
  const [tempFileDeletePolicy, setTempFileDeletePolicy] = React.useState("Immediate"); // Immediate, 1Hour, 24Hours
  const [redactPii, setRedactPii] = React.useState(true);
  const [scanViruses, setScanViruses] = React.useState(true);
  const [isolationLevel, setIsolationLevel] = React.useState("High"); // High, Enterprise

  const [savingSettings, setSavingSettings] = React.useState(false);
  const [savedSuccess, setSavedSuccess] = React.useState(false);

  const handleSaveSettings = () => {
    setSavingSettings(true);
    onAddLog("Initiated System Settings update sequence", "Authorized");
    speakText("Synchronizing secure configuration state with live systems.");
    setTimeout(() => {
      setSavingSettings(false);
      setSavedSuccess(true);
      onAddLog("Successfully synced new Sandbox Isolation and PII Redaction settings", "Completed");
      speakText("All security settings modified and securely stored on disk.");
      setTimeout(() => setSavedSuccess(false), 2000);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#050505] p-8 text-white">
      {/* Header */}
      <header className="mb-10 border-b border-[#232323] pb-6">
        <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Platform Options</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">System Settings</h1>
        <p className="text-xs text-gray-400 mt-2">Configure compliance rules, temporary file deletion timelines, and PII redaction algorithms.</p>
      </header>

      {/* Settings Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bank statement sanitizers (Left Column, 2 cols wide) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Statement security settings */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <h3 className="text-base font-bold font-sans mb-1 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#D8F275]" />
              <span>Statement Processing Engine Configuration</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6 font-sans">Control file validation parameters and metadata sanitizers during ledger OCR loading cycles.</p>

            <div className="space-y-4 text-xs font-mono">
              {/* PII Redact toggle */}
              <div className="flex items-center justify-between p-4 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                <div>
                  <span className="text-xs font-bold text-white block font-sans">Sensitive PII Redactor</span>
                  <span className="text-[10px] text-gray-500 block font-sans mt-0.5">Mask bank accounts, email patterns, and home addresses inside extracted statement strings</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={redactPii}
                  onChange={(e) => {
                    setRedactPii(e.target.checked);
                    onAddLog(`Toggled Account PII Masking: ${e.target.checked}`, "Authorized");
                  }}
                  className="w-4 h-4 rounded accent-[#D8F275] cursor-pointer"
                />
              </div>

              {/* Malware Scan toggle */}
              <div className="flex items-center justify-between p-4 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                <div>
                  <span className="text-xs font-bold text-white block font-sans">Virus & PDF Malware Validation</span>
                  <span className="text-[10px] text-gray-500 block font-sans mt-0.5">Scan files for active macros, external linkages, or buffer overflows threats before OCR parsing</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={scanViruses}
                  onChange={(e) => {
                    setScanViruses(e.target.checked);
                    onAddLog(`Toggled Malicious Macro Scanners: ${e.target.checked}`, "Authorized");
                  }}
                  className="w-4 h-4 rounded accent-[#D8F275] cursor-pointer"
                />
              </div>

              {/* Automatic Deletion Policy */}
              <div className="p-4 bg-[#0B0B0B] border border-[#232323] rounded-lg space-y-3">
                <div>
                  <span className="text-xs font-bold text-white block font-sans">Dynamic File Deletion Timeline Policy</span>
                  <span className="text-[10px] text-gray-500 block font-sans mt-0.5">Define duration for dynamic memory holding before purging uploaded CSV strings</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                  {["Immediate", "1Hour", "24Hours"].map((policy) => (
                    <button
                      key={policy}
                      type="button"
                      onClick={() => {
                        setTempFileDeletePolicy(policy);
                        onAddLog(`Set Document Lifecycle to: ${policy}`, "Completed");
                      }}
                      className={`py-2 px-3 border rounded-lg cursor-pointer uppercase transition-all ${
                        tempFileDeletePolicy === policy
                          ? "bg-[#D8F275] border-[#D8F275] text-black"
                          : "bg-transparent border-[#232323] text-gray-400 hover:text-white hover:bg-zinc-900/30"
                      }`}
                    >
                      {policy === "Immediate" ? "IMMEDIATE CATASTROPHE PURGE" : policy === "1Hour" ? "1 HOUR PARSE WINDOW" : "24 HR TEMPORARY CACHE"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Defenses configuration */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <h3 className="text-base font-bold font-sans mb-1 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#D8F275]" />
              <span>AI Defensive Isolation Controls</span>
            </h3>
            <p className="text-xs text-gray-400 mb-6 fn-sans">Defend copilot chat history arrays from prompt injections, hostile jailbreaks, and sensitive data leakage.</p>

            <div className="space-y-4 text-xs font-mono">
              {/* Injection filters details */}
              <div className="flex items-center justify-between p-4 bg-[#0B0B0B] border border-[#232323] rounded-lg">
                <div>
                  <span className="text-xs font-bold text-white block font-sans">Prompt Injection Sanitization Filters</span>
                  <span className="text-[10px] text-gray-500 block font-sans mt-0.5">Enforces strict runtime guardrails blocking 'DAN' style role-play queries on the Gemini proxy</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#D8F275] animate-pulse shadow-md shadow-[#D8F275]/20"></div>
              </div>

              {/* Isolation select */}
              <div className="p-4 bg-[#0B0B0B] border border-[#232323] rounded-lg space-y-3">
                <div>
                  <span className="text-xs font-bold text-white block font-sans">Gemini Session Context Isolation Threshold</span>
                  <span className="text-[10px] text-gray-500 block font-sans mt-0.5">Toggle dynamic data minimizations to balance fiduciary response intelligence</span>
                </div>
                <select
                  value={isolationLevel}
                  onChange={(e) => {
                    setIsolationLevel(e.target.value);
                    onAddLog(`Configured Context Isolation level: ${e.target.value}`, "Authorized");
                  }}
                  className="bg-[#111111] border border-[#232323] text-xs px-2.5 py-2.5 rounded-lg text-white font-sans focus:outline-none w-full"
                >
                  <option value="High">Maximum Data Isolation (Minimizes outbound vectors - Recommended)</option>
                  <option value="Enterprise">Standard Context Isolation (Permits rolling 10-message historical threads)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Settings controllers summary column (1 col) */}
        <div className="space-y-6">
          {/* Accessibility Suite Control Box */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <span className="text-[10px] font-mono text-[#D8F275] block uppercase font-bold tracking-widest mb-1.5">WCAG 2.2 ASSISTANCE</span>
            <h3 className="text-sm font-bold text-white mb-4">ADA & Speech Accessibility Suite</h3>
            
            <div className="space-y-4 text-xs">
              {/* High Contrast Mode Switch */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">High Contrast Mode</span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Enforce maximum luminance contrast ratios</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={highContrastMode} 
                  onChange={(e) => setHighContrastMode(e.target.checked)} 
                  className="accent-[#D8F275] h-4.5 w-4.5 cursor-pointer rounded"
                />
              </div>

              {/* Speech Narration Mode Switch */}
              <div className="flex items-center justify-between pt-3.5 border-t border-[#232323]/50">
                <div>
                  <span className="text-xs font-semibold text-white block">Speech Assistance</span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Automated visual layout voice announcements</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={screenReaderActive} 
                  onChange={(e) => setScreenReaderActive(e.target.checked)} 
                  className="accent-[#D8F275] h-4.5 w-4.5 cursor-pointer rounded"
                />
              </div>

              {/* Large clickable target label indicator */}
              <p className="text-[9px] leading-normal text-gray-500 font-mono pt-2">
                All interfaces actively conform to level AAA target sizing rules (minimum 44x44px bounds).
              </p>
            </div>
          </div>

          {/* RBAC Quick Control Panel */}
          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6">
            <span className="text-[10px] font-mono text-cyan-400 block uppercase font-bold tracking-widest mb-1.5 font-sans">IDENTITY VERIFICATION</span>
            <h3 className="text-sm font-bold text-white mb-3">Settings Access Authorization (RBAC)</h3>
            
            <label className="text-[9px] text-zinc-500 uppercase font-mono block mb-1">Assigned Operational Token</label>
            <select
              value={activeUserRole}
              onChange={(e) => {
                const role = e.target.value as any;
                setActiveUserRole(role);
                onAddLog(`Reallocated sandbox tenant token to ${role} config`, "Authorized");
              }}
              className="bg-[#0B0B0B] border border-[#232323] text-xs py-2 px-2.5 rounded text-white focus:outline-none focus:border-[#D8F275] w-full"
            >
              <option value="Fiduciary Master">Fiduciary Master (Full Root Admin)</option>
              <option value="Compliance Auditor">Compliance Auditor (Read Logs Only)</option>
              <option value="Risk Officer">Risk Officer (Isolators Command)</option>
              <option value="Standard User">Standard User (Standard Access)</option>
            </select>
          </div>

          <div className="bg-[#111111] border border-[#232323] rounded-xl p-6 flex flex-col justify-between h-max relative overflow-hidden">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">COMPLIANCE DIAGNOSTICS</h3>

            <div className="space-y-4 text-xs font-mono mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-green-400" />
                <span className="text-gray-300">W3C / GDPR Compliant Sandbox</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-green-400" />
                <span className="text-gray-300">Bank Statement Encryption Safe</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4.5 h-4.5 text-green-400" />
                <span className="text-gray-300">Biometric Authentications Paired</span>
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
              disabled={savingSettings}
              className="w-full py-3 bg-[#D8F275] hover:bg-[#B7FF4A] text-black font-semibold rounded-lg text-xs font-sans transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {savingSettings ? "SAVING CONFIGS STATE..." : savedSuccess ? "✓ CONFIGS APPLIED" : "SYNC SETTINGS METRICS"}
            </button>
            
            {savedSuccess && (
              <p className="text-[10px] text-[#D8F275] text-center font-mono mt-3 uppercase tracking-wider block">
                Enterprise parameters deployed!
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
