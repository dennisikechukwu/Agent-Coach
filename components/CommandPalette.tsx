"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "../lib/utils";

interface CommandPaletteProps {
  onCommand: (cmd: string) => void;
  className?: string;
}

const SUGGESTIONS = [
  { cmd: "/goal gym 3x/week $10", desc: "Create new gym goal" },
  { cmd: "/status", desc: "View current progress and stakes" },
  { cmd: "/help", desc: "See what I can do" },
];

export function CommandPalette({ onCommand, className }: CommandPaletteProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (cmd: string) => {
    onCommand(cmd);
    setInput("");
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative z-10 w-full">
        <input 
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowSuggestions(e.target.value.startsWith("/"));
          }}
          placeholder="Type / for commands or chat..."
          className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-4 rounded-xl focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-white/10 placeholder:text-zinc-600 shadow-lg transition-all"
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 disabled:opacity-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </form>
      
      {/* Autocomplete dropdown */}
      {showSuggestions && (
        <div className="absolute bottom-[calc(100%+8px)] left-0 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {SUGGESTIONS.filter(s => s.cmd.startsWith(input)).map((s, i) => (
            <div 
              key={i}
              onClick={() => handleSuggestionClick(s.cmd)}
              className="px-4 py-3 hover:bg-zinc-800 cursor-pointer flex items-center transition-colors border-b border-zinc-800 last:border-0"
            >
              <code className="text-[#1D9E75] font-bold tracking-wide mr-3">{s.cmd.split(" ")[0]}</code>
              <code className="text-zinc-300 font-mono text-xs flex-1">{s.cmd.substring(s.cmd.indexOf(" ") + 1)}</code>
              <span className="text-zinc-500 text-xs hidden sm:block">{s.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
