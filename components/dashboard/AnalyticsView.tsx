"use client";
import { ActivityIcon } from "./Icons";
import { ConsistencyChartWidget } from "./ConsistencyChartWidget";
import { useDashboard } from "../providers/DashboardProvider";

export function AnalyticsView() {
  const { goals, checkIns } = useDashboard();
  const historicalData = [20, 25, 45, 30, 60, 50, 80, 92];

  const totalStaked = goals.reduce((acc, goal) => acc + (Number(goal.stake_amount) || 0), 0);
  const totalCheckIns = checkIns.length;
  const approvedCheckIns = checkIns.filter(c => c.ai_status === 'approved').length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl md:text-3xl font-ovo tracking-tight mb-1">Analytics & Ledger</h2>
        <p className="text-zinc-400 font-light text-sm md:text-base">Total system performance and verification history.</p>
      </header>

      {/* Financial Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5">
           <h3 className="text-xs md:text-sm text-zinc-400 font-light mb-1">Total Active Staked</h3>
           <div className="text-2xl md:text-3xl font-black text-white">${totalStaked.toFixed(2)}</div>
        </div>
        <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5">
           <h3 className="text-xs md:text-sm text-zinc-400 font-light mb-1">Active Goals</h3>
           <div className="text-2xl md:text-3xl font-black text-white">{goals.length}</div>
        </div>
        <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5">
           <h3 className="text-xs md:text-sm text-zinc-400 font-light mb-1">Check-Ins</h3>
           <div className="text-2xl md:text-3xl font-black text-white">{totalCheckIns}</div>
        </div>
        <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5">
           <h3 className="text-xs md:text-sm text-zinc-400 font-light mb-1">Approval Rate</h3>
           <div className="text-2xl md:text-3xl font-black text-white">
             {totalCheckIns > 0 ? `${Math.round((approvedCheckIns / totalCheckIns) * 100)}%` : '—'}
           </div>
        </div>
      </div>

      {/* Long-term Consistency Chart */}
      <h3 className="font-ovo text-lg md:text-xl mt-8 md:mt-12 mb-4">Long-Term Consistency</h3>
      <ConsistencyChartWidget historicalData={historicalData} />

      {/* Verification Log */}
      <div className="bg-black/40 border border-white/5 rounded-3xl p-4 md:p-6 backdrop-blur-xl mt-8 md:mt-12">
        <h3 className="font-ovo text-base md:text-lg mb-6 flex items-center gap-2">
           <ActivityIcon />
           AI Verification Ledger
        </h3>
        
        <div className="space-y-4">
           {checkIns.length > 0 ? (
             checkIns.map((log, i) => (
               <div key={log.id || i} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                 <div className="md:w-48 shrink-0">
                   <div className="text-sm font-mono text-zinc-400">
                     {new Date(log.created_at).toLocaleString()}
                   </div>
                   <div className={`mt-1 text-xs font-bold uppercase tracking-wider ${log.ai_status === 'approved' ? 'text-emerald-400' : log.ai_status === 'rejected' ? 'text-red-400' : 'text-zinc-500'}`}>
                     {log.ai_status === 'approved' ? 'Verified ✓' : log.ai_status === 'rejected' ? 'Rejected ✗' : 'Pending...'}
                   </div>
                 </div>
                 <div>
                   <div className="font-semibold text-white text-sm mb-1">{log.goals?.title || 'Goal'}</div>
                   {log.ai_notes && (
                     <div className="text-sm text-zinc-400 font-mono bg-black/50 p-3 rounded-lg border border-white/5 mt-2">
                       <span className="text-zinc-300">AI Vision:</span> {log.ai_notes}
                     </div>
                   )}
                 </div>
               </div>
             ))
           ) : (
             <div className="text-center py-12 text-zinc-500">
               <p className="text-lg font-semibold mb-2">No check-ins yet</p>
               <p className="text-sm">Go to Active Goals and submit your first photo check-in!</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
