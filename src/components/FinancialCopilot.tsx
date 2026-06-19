import React from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Trash2, 
  ChevronRight,
  ArrowUpRight,
  Maximize2
} from "lucide-react";
import { CopilotMessage } from "../types";

interface FinancialCopilotProps {
  chatHistory: CopilotMessage[];
  onAddMessage: (msg: CopilotMessage) => void;
  onClearHistory: () => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export default function FinancialCopilot({ 
  chatHistory, 
  onAddMessage, 
  onClearHistory, 
  isLoading, 
  setIsLoading 
}: FinancialCopilotProps) {
  
  const [inputText, setInputText] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    { title: "Afford a Laptop?", text: "Can I afford a new laptop based on regular cash flows?" },
    { title: "Save ₹5,000 Monthly", text: "How can I save ₹5000 per month safely?" },
    { title: "Make Monthly Budget", text: "Create a monthly budget for my current metrics plan." }
  ] as const;

  // Scroll to bottom on updates
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    onAddMessage(userMsg);
    setInputText("");
    setIsLoading(true);

    try {
      const updatedMessages = [...chatHistory, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/gemini/copilot-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) throw new Error("Fiduciary Copilot proxy error");
      const data = await response.json();

      const assistantMsg: CopilotMessage = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        content: data.responseText || "Fiduciary Copilot did not produce output. Check keys configurations.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      onAddMessage(assistantMsg);
    } catch (err) {
      console.error(err);
      const errMsg: CopilotMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "### System Communications Interrupted\n\nWe encountered a transient network interruption while consulting the Fiduciary LLM servers. Please confirm that your **API Secret Keys** are active and retry your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      onAddMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  return (
    <div className="flex-1 overflow-hidden bg-[#050505] flex flex-col h-screen p-8 text-white">
      {/* Header */}
      <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#232323] pb-6 shrink-0">
        <div>
          <p className="text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest mb-1.5 font-mono">Expert Advisor</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] leading-none text-white">Fiduciary Assist</h1>
          <p className="text-xs text-gray-400 mt-2">Direct conversational pipeline to your fiduciary AI asset advisor.</p>
        </div>
        <button 
          onClick={onClearHistory}
          className="px-3.5 py-1.5 bg-[#111111] hover:bg-zinc-800 border border-[#232323] text-gray-300 font-semibold rounded-lg text-xs font-sans transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Chat Log</span>
        </button>
      </header>

      {/* Suggested quick-chips */}
      <div className="mb-6 flex flex-wrap gap-3 shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(p.text)}
            disabled={isLoading}
            className="px-4 py-2 bg-[#111111] hover:bg-zinc-900 border border-[#232323] text-xs font-medium rounded-lg text-[#D8F275] hover:text-[#B7FF4A] transition-all flex items-center gap-1.5 cursor-pointer text-left"
          >
            <span>{p.title}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>

      {/* Chats logs central box */}
      <div className="flex-1 overflow-y-auto bg-[#0B0B0B] border border-[#232323] rounded-xl p-6 mb-6 space-y-6">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-[#D8F275]/10 border border-[#D8F275]/20 flex items-center justify-center text-[#D8F275] mb-4">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1.5">Consult FinGuardian AI Copilot</h3>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              Ask deep questions targeting wealth distributions, capital projections, cash reserves math, and protective scams detection logic.
            </p>
          </div>
        ) : (
          chatHistory.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div 
                key={msg.id} 
                className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {/* Avatar (if model) */}
                {!isUser && (
                  <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#D8F275] shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                )}
                
                {/* Bubble */}
                <div className={`max-w-2xl rounded-xl p-5 ${
                  isUser 
                    ? "bg-[#D8F275] text-black font-semibold" 
                    : "bg-[#111111] border border-[#232323] text-gray-300 leading-relaxed text-sm font-sans"
                }`}>
                  {isUser ? (
                    <p className="whitespace-pre-wrap select-all">{msg.content}</p>
                  ) : (
                    <div className="prose prose-invert max-w-none text-xs space-y-3.5">
                      {msg.content.split("\n\n").map((para, idx) => {
                        if (para.startsWith("###")) {
                          return <h3 key={idx} className="text-sm font-bold text-white mb-2 mt-4 select-all">{para.replace("###", "").trim()}</h3>;
                        }
                        if (para.startsWith("####")) {
                          return <h4 key={idx} className="text-xs font-semibold text-[#D8F275] mb-1 pl-1 select-all">{para.replace("####", "").trim()}</h4>;
                        }
                        if (para.startsWith("* **")) {
                          return (
                            <div key={idx} className="pl-4 border-l border-zinc-700 space-y-1 my-2">
                              {para.split("\n").map((line, lIdx) => (
                                <p key={lIdx} className="text-[11px] text-gray-300 select-all">{line.trim()}</p>
                              ))}
                            </div>
                          );
                        }
                        if (para.startsWith("|") || para.includes("| :---")) {
                          // Render beautiful mock tables
                          return (
                            <div key={idx} className="overflow-x-auto my-3 border border-zinc-800 rounded bg-black/40">
                              <table className="min-w-full text-[10px] text-left divide-y divide-zinc-800">
                                <tbody className="divide-y divide-zinc-900">
                                  {para.split("\n").filter(line => line.includes("|") && !line.includes(":---")).map((line, lIdx) => (
                                    <tr key={lIdx} className={lIdx === 0 ? "bg-zinc-900/40 text-white font-bold" : "hover:bg-zinc-900/10"}>
                                      {line.split("|").filter(cell => cell.trim().length > 0).map((cell, cIdx) => (
                                        <td key={cIdx} className="px-3 py-2 select-all">{cell.trim()}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }
                        return <p key={idx} className="text-xs text-gray-400 select-all">{para.trim()}</p>;
                      })}
                    </div>
                  )}
                  <span className={`text-[9px] font-mono block mt-2.5 text-right ${
                    isUser ? "text-black/60" : "text-gray-500"
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>

                {/* Avatar (if user) */}
                {isUser && (
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white shrink-0 font-bold font-sans text-xs">
                    P
                  </div>
                )}
              </div>
            );
          })
        )}
        
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[#D8F275] animate-pulse">
              <Bot className="w-5 h-5 text-[#D8F275]" />
            </div>
            <div className="max-w-xs rounded-xl p-5 bg-[#111111] border border-[#232323] text-gray-400 flex items-center gap-2 text-xs font-mono">
              <Sparkles className="w-4 h-4 text-[#D8F275] animate-spin" />
              <span>FinCopilot is compiling vectors...</span>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input container */}
      <div className="bg-[#111111] border border-[#232323] p-4 rounded-xl flex items-center gap-3 shrink-0">
        <textarea
          rows={1}
          placeholder="Ask your Fiduciary AI copilot anything (e.g. Can I afford to buy a laptop?)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          className="flex-1 bg-transparent border-0 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-0 font-sans resize-none"
        />
        <button
          onClick={() => sendMessage(inputText)}
          disabled={isLoading || !inputText.trim()}
          className="p-3 rounded-lg bg-[#D8F275] hover:bg-[#B7FF4A] text-black transition-all flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
        >
          <Send className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}
