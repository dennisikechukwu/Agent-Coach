import { cn } from "../lib/utils";

interface StreakCounterProps {
  streak: number;
  className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
  return (
    <div className={cn("inline-block", className)}>
      <div className="flex items-center gap-3 bg-zinc-900/60 border border-white/10 rounded-full px-5 py-2.5">
        <span className="text-xl font-black text-white">{streak}</span>
        <span className="text-sm font-light text-zinc-400">day streak</span>
      </div>
    </div>
  );
}
