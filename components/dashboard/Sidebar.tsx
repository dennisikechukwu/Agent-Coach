import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AgentAvatar } from "../AgentAvatar";
import { LayoutDashboardIcon, TargetIcon, ActivityIcon } from "./Icons";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { id: 'goals', label: 'Goals', icon: TargetIcon },
  { id: 'analytics', label: 'Analytics', icon: ActivityIcon },
] as const;

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <>
      {/* ─── Mobile Top Bar ─── */}
      <header className="md:hidden sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl backdrop-saturate-150 pt-[env(safe-area-inset-top)] flex-shrink-0">
        <div className="flex items-center justify-between px-4 h-12">
          <div className="flex items-center gap-2.5">
            <AgentAvatar className="w-7 h-7 shadow-sm" />
            <Link href="/" className="font-ovo text-[15px] tracking-tight text-white">AgentCoach</Link>
          </div>
          <ConnectButton chainStatus="icon" showBalance={false} accountStatus="avatar" />
        </div>
      </header>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Frosted glass background */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl border-t border-white/[0.08]" />
        
        {/* Safe-area spacer for notched devices */}
        <div className="relative flex items-stretch justify-around px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  relative flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-2xl
                  transition-all duration-300 ease-out
                  ${isActive ? 'text-white' : 'text-zinc-500 active:text-zinc-300'}
                `}
              >
                {/* Active indicator pill glow */}
                {isActive && (
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                )}

                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                  <Icon />
                </span>
                <span className={`text-[11px] font-medium tracking-wide transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─── Desktop Sidebar (unchanged) ─── */}
      <aside className="hidden md:flex relative z-20 w-64 border-r border-white/5 bg-black/40 backdrop-blur-2xl flex-col h-screen sticky top-0 p-6 flex-shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <AgentAvatar className="w-8 h-8 shadow-sm" />
          <Link href="/" className="font-ovo text-lg tracking-tight hover:text-zinc-300 text-white">AgentCoach</Link>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out ${activeTab === id ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col">
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

              return (
                <div {...(!ready && { 'aria-hidden': true, style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' } })}>
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button" className="w-full bg-white text-black hover:bg-zinc-200 px-4 py-2.5 rounded-xl font-bold transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] flex justify-center items-center">
                          Connect Wallet
                        </button>
                      );
                    }
                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button" className="w-full bg-[#E24B4A] text-white font-bold px-4 py-2.5 rounded-xl flex justify-center items-center shadow-[0_0_15px_rgba(226,75,74,0.3)]">
                          Wrong network
                        </button>
                      );
                    }
                    return (
                      <div className="flex flex-col gap-2 w-full">
                        <button onClick={openChainModal} type="button" className="w-full flex items-center justify-center gap-2 bg-black/50 border border-white/10 hover:bg-white/5 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm text-zinc-300">
                          {chain.hasIcon && (
                            <div style={{ background: chain.iconBackground, width: 18, height: 18, borderRadius: 999, overflow: 'hidden' }}>
                              {chain.iconUrl && <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} style={{ width: 18, height: 18 }} />}
                            </div>
                          )}
                          {chain.name}
                        </button>
                        <button onClick={openAccountModal} type="button" className="w-full bg-white/10 border border-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl font-bold transition-all text-sm flex justify-center items-center text-white">
                          {account.displayName}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </aside>
    </>
  );
}

