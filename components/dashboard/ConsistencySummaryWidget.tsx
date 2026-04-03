export function ConsistencySummaryWidget({ adherenceRating }: { adherenceRating: number }) {
  return (
    <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D9E75]/20 rounded-full blur-[50px] transition-colors" />
      <h3 className="text-xs uppercase tracking-widest text-[#1D9E75] font-ovo mb-4">Adherence Rating</h3>
      <div className="flex items-end gap-2 text-5xl font-black mb-1">
        {adherenceRating}<span className="text-2xl text-zinc-500 mb-1">%</span>
      </div>
      <p className="text-sm text-zinc-400 font-light">Current active streak: 24 Days</p>
    </div>
  );
}
