import type { Metadata } from "next";
import { Inter, Ovo } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ovo = Ovo({
  variable: "--font-ovo",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentCoach — AI-Powered Accountability",
  description: "Stake your money on your goals. An autonomous AI coach that holds you accountable with real financial consequences.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${ovo.variable} antialiased min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-[family-name:var(--font-inter)]`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
