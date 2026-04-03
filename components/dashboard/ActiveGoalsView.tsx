"use client";
import { useRef, useState } from "react";
import { TargetIcon } from "./Icons";
import { useDashboard } from "../providers/DashboardProvider";

export function ActiveGoalsView() {
  const { goals, refreshProfile } = useDashboard();
  const [verifying, setVerifying] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, { verified: boolean; analysis: string; confidence: number }>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeGoalRef = useRef<{ id: string; title: string } | null>(null);

  const handleCheckIn = (goalId: string, goalTitle: string) => {
    activeGoalRef.current = { id: goalId, title: goalTitle };
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeGoalRef.current) return;

    const goalId = activeGoalRef.current.id;
    const goalTitle = activeGoalRef.current.title;
    setVerifying(goalId);

    // Convert to base64
    const reader = new FileReader();
    reader.onload = async () => {
      const imageData = reader.result as string;
      
      try {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'verify-photo',
            payload: {
              imageData,
              goalId,
              goalTitle,
              walletAddress: goals[0]?.wallet_address,
            }
          })
        });

        const result = await res.json();
        setResults(prev => ({ ...prev, [goalId]: result }));
      } catch (err) {
        setResults(prev => ({
          ...prev,
          [goalId]: { verified: false, analysis: "Network error during verification.", confidence: 0 }
        }));
      } finally {
        setVerifying(null);
        // Reset file input so same file can be selected again
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-ovo tracking-tight mb-1">Active Goals</h2>
        <p className="text-zinc-400 font-light text-sm md:text-base">Keep up the momentum. Don't lose your stake.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <div key={goal.id} className="bg-zinc-900/40 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group flex flex-col justify-between min-h-[280px]">
            
            <div className="z-10 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-ovo text-lg md:text-xl text-white truncate pr-4">{goal.title}</h3>
                <span className="bg-white/10 text-zinc-300 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider shrink-0">Active</span>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-xs text-zinc-500 font-mono mb-2">
                  <span>Day 1</span>
                  <span>Day {goal.duration_days}</span>
                </div>
                <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-white shadow-sm" 
                    style={{ width: `${Math.max((1 / goal.duration_days) * 100, 5)}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-zinc-400 font-light">Staked:</span>
                <span className="text-2xl font-black text-white">${goal.stake_amount}</span>
                <span className="text-xs text-zinc-500 font-mono">USDC</span>
              </div>
            </div>

            {/* Verification Result */}
            {results[goal.id] && (
              <div className={`z-10 mt-4 p-3 rounded-xl text-xs font-mono border ${
                results[goal.id].verified
                  ? "bg-emerald-950/30 border-emerald-800/30 text-emerald-300"
                  : "bg-red-950/30 border-red-800/30 text-red-300"
              }`}>
                <div className="font-bold mb-1">
                  {results[goal.id].verified ? "Verified" : "Rejected"} 
                  <span className="text-zinc-500 ml-1">({Math.round(results[goal.id].confidence * 100)}%)</span>
                </div>
                {results[goal.id].analysis}
              </div>
            )}

            <button 
              onClick={() => handleCheckIn(goal.id, goal.title)}
              disabled={verifying === goal.id}
              className={`relative z-10 w-full mt-4 py-3 rounded-xl font-bold transition-all text-sm ${
                verifying === goal.id
                  ? "bg-white/5 text-zinc-500 cursor-wait"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {verifying === goal.id ? "Verifying with AI Vision..." : "Daily Check-In"}
            </button>
          </div>
        ))}

        {/* Empty State / Add New Goal Card */}
        <div className="bg-black/40 border border-dashed border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[280px] group hover:border-white/20 transition-colors cursor-pointer opacity-70 hover:opacity-100">
           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 text-zinc-400 group-hover:text-white transition-colors group-hover:scale-110 duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           </div>
           <h3 className="font-ovo text-zinc-300">Start New Challenge</h3>
           <p className="text-sm text-zinc-500 font-light mt-2 text-center">Use the <code className="text-zinc-300">/goal</code> command in the chat.</p>
        </div>
      </div>
    </div>
  );
}
