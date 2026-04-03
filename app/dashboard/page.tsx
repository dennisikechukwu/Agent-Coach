"use client";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Sidebar } from "../../components/dashboard/Sidebar";
import { ConsistencySummaryWidget } from "../../components/dashboard/ConsistencySummaryWidget";
import { TreasuryWidget } from "../../components/dashboard/TreasuryWidget";
import { ConsistencyChartWidget } from "../../components/dashboard/ConsistencyChartWidget";
import { AIChatWidget } from "../../components/dashboard/AIChatWidget";
import { ActiveGoalsView } from "../../components/dashboard/ActiveGoalsView";
import { AnalyticsView } from "../../components/dashboard/AnalyticsView";

export default function DashboardPage() {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  
  // Feature 1: Functional Tab Navigation
  const [activeTab, setActiveTab] = useState("dashboard");

  // Feature 3: Dynamic SVG Chart Geometry
  // Historical data on a 0-100 scale
  const historicalData = [20, 25, 45, 30, 60, 50, 80, 92];

  // Render dynamic dashboard view payload
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col md:flex-row font-sans selection:bg-white/10">
      
      {/* Clean grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dashboard Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden px-4 pt-5 pb-28 md:p-10 md:pb-10 lg:p-12 lg:pb-12">
        
        {activeTab === 'goals' ? (
          <ActiveGoalsView />
        ) : activeTab === 'analytics' ? (
          <AnalyticsView />
        ) : (
          <>
            {/* Header Area */}
            <header className="mb-8 md:mb-10">
              <h1 className="text-2xl md:text-3xl font-ovo tracking-tight mb-1">Welcome Back</h1>
              <p className="text-zinc-400 font-light text-sm md:text-base">Your total adherence is higher than 84% of network participants.</p>
            </header>

            {/* Top Widgets Grid (3 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              
              {/* Widget 1: Consistency Summary */}
              <ConsistencySummaryWidget adherenceRating={historicalData[historicalData.length - 1]} />

              {/* Widget 2: Dynamic Treasury Balance */}
              <TreasuryWidget balanceData={balanceData} address={address} />

            </div>

            {/* Lower Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Dynamic Main Chart Area (Spans 2 cols) */}
              <ConsistencyChartWidget historicalData={historicalData} />

              {/* Interactive AI Verification Sidebar / Chat */}
              <AIChatWidget />

            </div>
          </>
        )}
      </main>
    </div>
  );
}
