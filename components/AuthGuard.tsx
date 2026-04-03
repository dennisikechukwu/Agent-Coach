"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isConnected, isConnecting } = useAccount();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Wagmi state requires client-side hydration checking
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isConnecting && !isConnected) {
      router.replace("/");
    }
  }, [isMounted, isConnected, isConnecting, router]);

  // Don't render protected content until we are absolutely sure the user is connected
  if (!isMounted || !isConnected) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-[#1D9E75] border-zinc-800 rounded-full animate-spin" />
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Checking Authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
