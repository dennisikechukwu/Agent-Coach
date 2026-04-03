import { cn } from "../lib/utils";

interface ProgressBarProps {
  targetDays: number;
  completedDays: number;
  className?: string;
}

export function ProgressBar({ targetDays, completedDays, className }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (completedDays / targetDays) * 100));

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-zinc-600 dark:text-zinc-400 font-medium">Goal progress</span>
        <span className="font-bold text-zinc-800 dark:text-zinc-200">
          {completedDays}/{targetDays} days
        </span>
      </div>
      
      {/* Main progress bar */}
      <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-[#1D9E75] to-[#639922] transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(29,158,117,0.5)]"
          style={{ width: `${percentage}%` }} 
        />
      </div>
      
      {/* Individual day dots */}
      <div className="flex gap-2 mt-2">
        {Array.from({ length: targetDays }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "flex-1 h-2 rounded-full transition-colors duration-500",
              i < completedDays 
                ? "bg-[#639922] shadow-[0_0_5px_rgba(99,153,34,0.4)]" 
                : "bg-zinc-200 dark:bg-zinc-700"
            )} 
          />
        ))}
      </div>
    </div>
  );
}
