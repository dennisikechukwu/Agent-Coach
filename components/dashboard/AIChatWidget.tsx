"use client";
import { useState, useRef, useEffect } from "react";
import { AgentAvatar } from "../AgentAvatar";
import { CommandPalette } from "../CommandPalette";
import { useDashboard } from "../providers/DashboardProvider";

export function AIChatWidget() {
  const { messages, addMessage, addGoal, walletAddress } = useDashboard();
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Extract dollar amount from a goal command like "/goal gym 3x/week $10"
  const extractAmount = (cmd: string): number => {
    const match = cmd.match(/\$(\d+)/);
    return match ? parseInt(match[1], 10) : 50;
  };

  // Extract goal title from a goal command
  const extractGoalTitle = (cmd: string): string => {
    // Remove "/goal" prefix and the "$amount" portion  
    const cleaned = cmd.replace(/^\/goal\s*/i, '').replace(/\$\d+/g, '').trim();
    return cleaned || "Personal Challenge";
  };

  // Store the last user command for extracting goal details
  const lastGoalCmd = useRef<string>("");

  const handleCommand = async (cmd: string) => {
    if (!walletAddress) {
      alert("Please connect your wallet first to chat!");
      return;
    }

    // Track goal commands for the MoonPay button
    if (cmd.startsWith("/goal")) {
      lastGoalCmd.current = cmd;
    }

    await addMessage(cmd, true);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cmd, walletAddress }),
      });

      const data = await res.json();
      if (data.error) {
        await addMessage(`**API Error:** ${data.error}`, false);
      } else {
        await addMessage(data.response, false);
      }
    } catch (e) {
      await addMessage("Network error occurred. The backend might be offline.", false);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessageContent = (content: string) => {
    if (content.includes("[MOONPAY_TRIGGER]")) {
      const parts = content.split("[MOONPAY_TRIGGER]");
      const amount = extractAmount(lastGoalCmd.current);
      const title = extractGoalTitle(lastGoalCmd.current);

      return (
        <>
          {parts[0]}
          <div className="mt-4 mb-2 p-4 bg-black/40 border border-white/10 rounded-xl">
             <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></span>
               Fiat-to-Crypto Checkout
             </h4>
             <div className="w-full flex items-center justify-between mb-4 text-xs text-zinc-400 border-b border-white/5 pb-3">
                <span>Network: <strong className="text-white">Base</strong></span>
                <span>Asset: <strong className="text-white">USDC</strong></span>
                <span>Stake: <strong className="text-white">${amount}</strong></span>
             </div>
             <button 
               onClick={async () => {
                 await addMessage(`Locking $${amount} USDC stake for "${title}"...`, true);
                 setTimeout(async () => {
                   await addGoal(title, amount, 30);
                   await addMessage(`**Payment Verified.** \nYour stake of $${amount} USDC has been successfully locked on the Base network via MoonPay. Your goal "${title}" is now ACTIVE.`, false);
                 }, 2000);
               }}
               className="flex items-center justify-center w-full bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded-lg font-bold transition-all cursor-pointer"
             >
               Lock ${amount} USDC Stake
             </button>
          </div>
          {parts[1]}
        </>
      );
    }
    return content;
  };

  return (
    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <AgentAvatar className="w-8 h-8 text-sm shadow-sm" />
          <div>
            <h3 className="font-ovo text-md text-white">Agent Coach</h3>
            <p className="text-[10px] text-zinc-400 flex items-center gap-1 uppercase font-bold tracking-widest">
              <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></span> Online
            </p>
          </div>
        </div>
        <span className="bg-white/10 text-zinc-300 text-xs px-2 py-1 rounded-md font-bold">AgentCoach AI</span>
      </div>
      
      {/* Chat Messages Log — auto-scrolls */}
      <div ref={scrollRef} className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar mb-4 flex flex-col">
        {messages.map((m) => (
          <div key={m.id} className={`w-full flex ${m.is_user ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
              m.is_user 
                ? "bg-white text-black rounded-tr-sm" 
                : "bg-black/50 border border-white/10 text-zinc-300 rounded-tl-sm"
            }`}>
              {renderMessageContent(m.content)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="w-full flex justify-start">
            <div className="bg-black/50 border border-white/10 text-zinc-300 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Command Palette */}
      <div className="pt-2 shrink-0 border-t border-white/5 mt-auto relative z-10 block">
        <CommandPalette onCommand={handleCommand} className="w-full mt-4" />
      </div>
    </div>
  );
}
