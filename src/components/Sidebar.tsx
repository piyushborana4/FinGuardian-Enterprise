import React from "react";
import { 
  LayoutDashboard, 
  Receipt, 
  HeartHandshake, 
  Bot, 
  Target, 
  TrendingUp, 
  GraduationCap, 
  ShieldCheck, 
  Settings, 
  Lock,
  Clock,
  UserCheck
} from "lucide-react";
import { NavTab } from "../types";

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  securityScore: number;
  userEmail: string;
}

export default function Sidebar({ activeTab, setActiveTab, securityScore, userEmail }: SidebarProps) {
  const [localTime, setLocalTime] = React.useState(new Date().toUTCString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date().toUTCString());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "command_center", name: "Financial Command Center", icon: LayoutDashboard },
    { id: "ledger", name: "Ledger Intelligence Engine", icon: Receipt },
    { id: "scam_intelligence", name: "Scam Intelligence Center", icon: HeartHandshake },
    { id: "copilot", name: "Financial Copilot", icon: Bot },
    { id: "wealth_planning", name: "Wealth Planning Studio", icon: Target },
    { id: "wealth_projection", name: "Wealth Projection Engine", icon: TrendingUp },
    { id: "knowledge_center", name: "Financial Knowledge Center", icon: GraduationCap },
    { id: "security", name: "Security Center", icon: ShieldCheck },
    { id: "settings", name: "Settings", icon: Settings },
  ] as const;

  return (
    <aside className="w-80 border-r border-[#232323] bg-[#0B0B0B] flex flex-col h-screen sticky top-0 shrink-0 text-white select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#232323] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#D8F275] flex items-center justify-center shadow-md">
            <Lock className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-sans font-bold tracking-tight text-white block text-lg">FinGuardian <span className="text-[#D8F275]">AI</span></span>
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest block">Enterprise Vault OS</span>
          </div>
        </div>
      </div>

      {/* Real-time System Telemetry */}
      <div className="px-6 py-3 bg-[#050505] border-b border-[#232323] flex items-center justify-between text-xs text-gray-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>SECURE PROTOCOL</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px]">UTC CLK</span>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-left text-sm font-sans transition-all duration-200 outline-none group ${
                isActive
                  ? "bg-[#D8F275] text-black font-medium shadow-sm shadow-[#D8F275]/10"
                  : "text-gray-400 hover:text-white hover:bg-[#111111]"
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-all ${
                isActive ? "text-black" : "text-gray-400 group-hover:text-[#D8F275]"
              }`} />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Security Score Widget */}
      <div className="p-4 mx-4 mb-4 rounded-xl bg-[#111111] border border-[#232323] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 font-sans">Shield Integrity</span>
          <span className="text-[#D8F275] font-mono font-bold">{securityScore}%</span>
        </div>
        <div className="w-full bg-[#232323] rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-[#D8F275] h-full rounded-full transition-all duration-500"
            style={{ width: `${securityScore}%` }}
          />
        </div>
        <div className="text-[10px] text-gray-500 font-mono flex items-center justify-between">
          <span>AES-256 / SHA3</span>
          <span className="text-green-500">OPTIMAL</span>
        </div>
      </div>

      {/* User Information Panel */}
      <div className="p-6 border-t border-[#232323] bg-[#050505] flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-[#D8F275] text-sm font-sans">
            PB
          </div>
          <div className="overflow-hidden">
            <span className="font-sans font-medium text-white block text-sm truncate">Piyush Borana</span>
            <span className="text-xs text-gray-400 block truncate" title={userEmail}>
              {userEmail || "piyushborana12@gmail.com"}
            </span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 bg-[#111111] px-2.5 py-1.5 rounded border border-[#232323] text-[9px] text-gray-500 font-mono">
          <UserCheck className="w-3 h-3 text-[#D8F275]" />
          <span>AUTHD GUEST CLIENT ROLE</span>
        </div>
      </div>
    </aside>
  );
}
