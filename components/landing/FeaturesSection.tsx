"use client";
import { motion } from "framer-motion";
import { StakeDisplay } from "../StakeDisplay";
import { AgentAvatar } from "../AgentAvatar";
import { StreakCounter } from "../StreakCounter";

export function FeaturesSection() {
  return (
    <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: High Stakes (Red focus) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E24B4A]/10 rounded-full blur-[80px] group-hover:bg-[#E24B4A]/20 transition-colors" />
            
            <h3 className="text-2xl font-bold mb-3 z-10 relative">High Stakes</h3>
            <p className="text-zinc-400 font-light mb-8 z-10 relative leading-relaxed">
              Lock your funds via MoonPay. No backing out. Failure means losing your capital entirely to the EnforcerAgent.
            </p>
            
            <div className="relative z-10 flex items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5">
               <StakeDisplay amount={100} className="w-full transform scale-90 origin-center" />
            </div>
          </motion.div>

          {/* Card 2: AI Verification (Purple focus) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-white/5 rounded-[2rem] p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden group"
          >
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#7F77DD]/10 rounded-full blur-[100px] group-hover:bg-[#7F77DD]/20 transition-colors" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="flex flex-col justify-center">
                <h3 className="text-3xl font-bold mb-4">AI Vision Checks</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  You can't lie to the Coach. We use state-of-the-art vision models to verify your daily photos. Sending a photo of an empty gym won't cut it. Sending a screenshot of code won't cut it. True accountability.
                </p>
                <div className="mt-8 flex gap-3">
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-[#7F77DD]">Computer Vision</div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-[#1D9E75]">XMTP Protocol</div>
                </div>
              </div>
              
              {/* Fake chat window */}
              <div className="bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col gap-4 relative justify-end h-64 overflow-hidden">
                <div className="self-end bg-blue-600 px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[80%] shadow-lg shadow-blue-900/20">
                  Here's my gym selfie for today
                </div>
                <div className="self-start flex gap-2 w-full">
                  <AgentAvatar className="w-8 h-8 scale-75 origin-top-left" />
                  <div className="bg-zinc-800 px-4 py-2 rounded-2xl rounded-tl-sm text-sm border border-zinc-700 max-w-[80%]">
                    Verification successful. I can see the squat rack behind you. Day 3 complete.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Dopamine Streaks (Green focus) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 bg-zinc-900/40 border border-[#1D9E75]/20 rounded-[2rem] p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden group flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="absolute -left-20 top-0 w-80 h-80 bg-[#1D9E75]/10 rounded-full blur-[100px] group-hover:bg-[#1D9E75]/20 transition-colors" />
            
            <div className="max-w-xl z-10">
              <h3 className="text-3xl font-bold mb-4">Build Momentum. Get Rewarded.</h3>
              <p className="text-zinc-400 font-light leading-relaxed">
                Consistency is hard. We make it addictive. Watch your streaks go up and your progress bar fill. Complete the target and receive your stake back plus a 20% bonus from the failure pool.
              </p>
            </div>

            <div className="z-10 flex flex-col items-center gap-6 bg-black/40 p-6 rounded-3xl border border-white/5 w-full md:w-auto min-w-[300px]">
              <StreakCounter streak={12} className="transform scale-110" />
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs text-zinc-500 font-mono">
                  <span>Day 1</span>
                  <span>Day 14</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#1D9E75] to-[#639922] w-[85%] shadow-[0_0_15px_#1D9E75]" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
    </section>
  );
}
