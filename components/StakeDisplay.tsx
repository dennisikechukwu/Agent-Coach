import { cn } from "../lib/utils";

interface StakeDisplayProps {
  amount: number;
  currency?: string;
  className?: string;
}

export function StakeDisplay({ amount, currency = "USDC", className }: StakeDisplayProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-[#E24B4A]/10 rounded-2xl animate-pulse" />
      <div className="relative bg-white dark:bg-zinc-900 border-2 border-[#E24B4A] rounded-2xl p-6 shadow-[0_0_15px_rgba(226,75,74,0.3)]">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1 font-medium">Money at stake</p>
        <p className="text-4xl font-bold text-[#E24B4A]">
          ${amount.toFixed(2)} {currency}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-[#E24B4A] rounded-full animate-pulse shadow-[0_0_5px_#E24B4A]" />
          <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">Locked until goal complete</p>
        </div>
      </div>
    </div>
  );
}
