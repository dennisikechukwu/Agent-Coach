import { WalletIcon } from "./Icons";
import { formatUnits } from "viem";

interface TreasuryWidgetProps {
  balanceData: any;
  address: string | undefined;
}

export function TreasuryWidget({ balanceData, address }: TreasuryWidgetProps) {
  return (
    <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
      
      <div className="z-10 w-full md:w-auto">
        <div className="flex items-center gap-2 mb-4 text-zinc-400 text-sm">
          <WalletIcon />
           <span className="font-light">On-Chain Wallet Balance</span>
        </div>
        <div className="text-4xl md:text-5xl font-black flex items-baseline gap-2 text-white">
          {balanceData ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) : "0.0000"} <span className="text-xl font-bold text-zinc-600 uppercase tracking-widest">{balanceData?.symbol || "ETH"}</span>
        </div>
        {address ? (
          <p className="text-zinc-400 text-sm font-light mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" /> 
            Connected
          </p>
        ) : (
          <p className="text-zinc-500 text-sm font-light mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" /> 
            No Wallet Detected
          </p>
        )}
      </div>

      <div className="z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3">
        <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-3 rounded-xl font-bold transition-all text-sm backdrop-blur-md opacity-50 cursor-not-allowed">
          Withdraw
        </button>
        <button 
          onClick={() => alert("Use the /goal command in the AI Chat to stake USDC on a new goal!")}
          className="bg-white text-black hover:bg-zinc-200 px-5 py-3 rounded-xl font-bold transition-all text-sm"
        >
          Deposit Stakes
        </button>
      </div>
    </div>
  );
}

