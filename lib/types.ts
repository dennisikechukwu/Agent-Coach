export type GoalStatus = 'pending_payment' | 'active' | 'completed' | 'failed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'donated';

export interface User {
  id: string;
  wallet_address: string;
  xmtp_address: string;
  display_name?: string;
  total_goals: number;
  completed_goals: number;
  failed_goals: number;
  total_staked: number;
  total_earned: number;
  current_streak: number;
  longest_streak: number;
  created_at: string;
  last_active_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  goal_type: string;
  goal_description: string;
  frequency: string;
  target_days: number;
  completed_days: number;
  stake_amount: number;
  reward_amount: number;
  penalty_amount: number;
  status: GoalStatus;
  payment_status: PaymentStatus;
  moonpay_transaction_id?: string;
  moonpay_payment_url?: string;
  payment_confirmed_at?: string;
  created_at: string;
  starts_at?: string;
  ends_at?: string;
  completed_at?: string;
  last_checkin_at?: string;
  failure_reason?: string;
  notes?: string;
}

export interface Checkin {
  id: string;
  goal_id: string;
  user_id: string;
  image_url?: string;
  image_analysis?: string;
  verified: boolean;
  verification_score?: number;
  latitude?: number;
  longitude?: number;
  created_at: string;
  day_number: number;
  notes?: string;
}

export interface AgentLog {
  id: string;
  agent_name: string;
  user_id?: string;
  goal_id?: string;
  message_type: string;
  message_content?: string;
  response_content?: string;
  created_at: string;
  processing_time_ms?: number;
  error?: string;
}

// Supabase Database type (to be expanded later)
export type Database = any;
