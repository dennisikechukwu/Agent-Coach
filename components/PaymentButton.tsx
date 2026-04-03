import { cn } from "../lib/utils";

interface PaymentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  amount: number;
  currency?: string;
}

export function PaymentButton({ amount, currency = "USDC", className, ...props }: PaymentButtonProps) {
  return (
    <button 
      className={cn(
        "group relative overflow-hidden bg-white text-black font-medium px-6 py-3 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all w-full text-sm",
        className
      )}
      {...props}
    >
      <span className="relative flex items-center justify-center gap-2">
        <span>Pay ${amount.toFixed(2)} {currency} via MoonPay</span>
        <span className="text-zinc-500 group-hover:translate-x-0.5 transition-transform">→</span>
      </span>
    </button>
  );
}
