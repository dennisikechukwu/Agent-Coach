"use client";
import { motion } from "framer-motion";

export function FAQSection() {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 py-20 md:py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-zinc-400">Everything you need to know about staking your money on your goals.</p>
      </div>
      <div className="space-y-4">
        {[
          { q: 'What happens if I forget to check in?', a: 'If you miss your daily check-in window (midnight your local time), that day is marked as failed. If you fail to meet your overall target check-ins, your stake is distributed to the success pool.' },
          { q: 'Can I fake my photos?', a: 'Our AI Vision engine is trained to detect context. A dark room, an old screenshot, or an irrelevant photo will be rejected. The Agent acts as an impartial, strict coach.' },
          { q: 'How do I get paid back?', a: 'Once the EnforcerAgent verifies your goal is mathematically completed, it automatically triggers a smart contract (or MoonPay transfer) sending your USDC + bonus directly back to your connected web3 wallet.' },
          { q: 'Are my funds safe?', a: 'Yes. Funds are held in an audited escrow contract following OWS (Open Wallet Standard) policies. We do not have access to your private keys.' }
        ].map((faq, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6"
          >
            <h4 className="text-lg font-bold mb-2 text-zinc-200">{faq.q}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
