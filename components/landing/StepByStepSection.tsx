"use client";
import { motion } from "framer-motion";

export function StepByStepSection() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20 border-t border-white/5">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">Four simple steps to absolute accountability and unbreakable habits.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-[50%] left-0 w-full h-[1px] bg-white/10 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {[
          { step: '01', title: 'Connect', desc: 'Securely connect your wallet using RainbowKit and XMTP to establish your identity.', color: 'text-[#7F77DD]' },
          { step: '02', title: 'Stake', desc: 'Choose a goal and lock in USDC via MoonPay. The EnforcerAgent holds it in escrow.', color: 'text-[#E24B4A]' },
          { step: '03', title: 'Verify', desc: 'Send daily photo proof. Our AI Vision engine verifies if you actually went to the gym or coded.', color: 'text-[#1D9E75]' },
          { step: '04', title: 'Profit', desc: 'Complete the goal and earn back your stake, plus a bonus from those who failed.', color: 'text-[#639922]' }
        ].map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-black/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center hover:border-white/20 transition-colors"
          >
            <span className={`text-5xl font-black mb-4 opacity-50 ${s.color}`}>{s.step}</span>
            <h4 className="text-xl font-bold mb-2">{s.title}</h4>
            <p className="text-sm text-zinc-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
