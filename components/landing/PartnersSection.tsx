export function PartnersSection() {
  return (
    <section className="relative z-10 py-16 md:py-20 bg-zinc-900/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <p className="text-xs font-medium mb-10 text-zinc-500 uppercase tracking-widest">Built with</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50">
          <div className="text-2xl font-semibold tracking-tight text-zinc-300">MoonPay</div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-300">XMTP</div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-300">Base</div>
          <div className="text-2xl font-semibold tracking-tight text-zinc-400">OWS</div>
        </div>
      </div>
    </section>
  );
}
