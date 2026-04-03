"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AgentAvatar } from "../AgentAvatar";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <AgentAvatar className="w-8 h-8" />
          <span className="font-medium text-sm tracking-tight text-white">AgentCoach</span>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <ConnectButton />
          <Link href="/dashboard" className="text-xs font-medium bg-white/10 hover:bg-white/15 px-4 py-2 rounded-full transition-all border border-white/10 text-zinc-300">
            Dashboard
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden p-2 text-white relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-light text-zinc-300 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-light text-zinc-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <div className="mt-8">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
