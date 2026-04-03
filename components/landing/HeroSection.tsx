"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <main className="relative z-10 pt-32 sm:pt-40 lg:pt-48 px-6 lg:px-12 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
        <span className="text-[11px] font-medium tracking-wider text-zinc-400 uppercase">AI-Powered Accountability</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight leading-[1.15] max-w-4xl text-white font-[family-name:var(--font-ovo)]"
      >
        Don't just set goals. <br className="hidden md:block" />
        <span className="text-zinc-500">
          Put your money on it.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 text-base sm:text-lg text-zinc-500 max-w-xl leading-relaxed font-light"
      >
        An autonomous AI coach that holds you accountable. Stake USDC on-chain, send daily verification photos, and complete your goal — or lose your stake.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
      >
        <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-white text-black font-medium text-sm px-6 py-3 rounded-full hover:bg-zinc-200 active:scale-[0.98] transition-all">
          Start a Challenge
          <span className="text-zinc-500">→</span>
        </Link>
        <Link href="#how-it-works" className="flex items-center justify-center bg-transparent text-zinc-400 border border-white/10 font-medium text-sm px-6 py-3 rounded-full hover:bg-white/5 transition-all">
          How It Works
        </Link>
      </motion.div>
    </main>
  );
}
