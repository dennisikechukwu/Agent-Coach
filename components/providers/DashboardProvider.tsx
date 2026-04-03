"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

interface DashboardContextType {
  walletAddress: string | undefined;
  profile: any;
  messages: any[];
  goals: any[];
  checkIns: any[];
  isLoading: boolean;
  addMessage: (content: string, isUser: boolean) => Promise<void>;
  addGoal: (title: string, stakeAmount: number, durationDays: number) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>({} as DashboardContextType);

const generateId = () => {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
};

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [profile, setProfile] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [checkIns, setCheckIns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (walletAddress: string) => {
    setIsLoading(true);
    
    try {
      // All reads go through the secure server-side API route
      const res = await fetch(`/api/sync?wallet=${walletAddress}`);
      const data = await res.json();

      if (data.error) {
        console.error("Sync API error:", data.error);
        setIsLoading(false);
        return;
      }

      setProfile(data.profile);
      setGoals(data.goals || []);
      setCheckIns(data.checkIns || []);

      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        // First time user - send welcome message through server
        const welcomeRes = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'add_message',
            walletAddress,
            payload: {
              content: "Welcome to AgentCoach. I am your accountability partner.\nCreate a stake using `/goal` to get started.",
              is_user: false,
            }
          })
        });
        const welcomeData = await welcomeRes.json();
        if (welcomeData.data) {
          setMessages([welcomeData.data]);
        } else {
          // Fallback if API fails
          setMessages([{
            id: generateId(),
            wallet_address: walletAddress,
            content: "Welcome to AgentCoach. I am your accountability partner.\nCreate a stake using `/goal` to get started.",
            is_user: false,
            created_at: new Date().toISOString(),
          }]);
        }
      }
    } catch (e) {
      console.error("Fetch user data failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchUserData(address);
    } else {
      setProfile(null);
      setMessages([]);
      setGoals([]);
      setIsLoading(false);
    }
  }, [isConnected, address]);

  const addMessage = async (content: string, isUser: boolean) => {
    if (!address) return;

    // Optimistic UI
    const optimisticMsg = {
      id: generateId(),
      wallet_address: address,
      content,
      is_user: isUser,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_message',
          walletAddress: address,
          payload: { content, is_user: isUser },
        })
      });
      const { data, error } = await res.json();
      if (!error && data) {
        setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? data : m));
      }
    } catch {
      console.error("Failed to commit message to DB");
    }
  };

  const addGoal = async (title: string, stakeAmount: number, durationDays: number) => {
    if (!address) return;

    // Optimistic UI
    const optimisticGoal = {
      id: generateId(),
      wallet_address: address,
      title,
      stake_amount: stakeAmount,
      duration_days: durationDays,
      status: 'active',
      created_at: new Date().toISOString(),
    };
    setGoals(prev => [optimisticGoal, ...prev]);

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_goal',
          walletAddress: address,
          payload: {
            title,
            stake_amount: stakeAmount,
            duration_days: durationDays,
          },
        })
      });
      const { data, error } = await res.json();
      if (!error && data) {
        setGoals(prev => prev.map(g => g.id === optimisticGoal.id ? data : g));
      }
    } catch {
      console.error("Failed to commit goal to DB");
    }
  };

  const refreshProfile = async () => {
    if (address) await fetchUserData(address);
  };

  return (
    <DashboardContext.Provider value={{ walletAddress: address, profile, messages, goals, checkIns, isLoading, addMessage, addGoal, refreshProfile }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
