import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET: Fetch all user data (profile, messages, goals) for a wallet
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const walletAddress = searchParams.get('wallet');

  if (!walletAddress) {
    return NextResponse.json({ error: 'wallet param required' }, { status: 400 });
  }

  try {
    // 1. Get or create profile
    let { data: profile, error: profErr } = await supabaseServer
      .from('profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (profErr && profErr.code === 'PGRST116') {
      const { data: newProf } = await supabaseServer
        .from('profiles')
        .insert([{ wallet_address: walletAddress }])
        .select()
        .single();
      profile = newProf;
    }

    // 2. Fetch messages
    const { data: messages } = await supabaseServer
      .from('messages')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('created_at', { ascending: true });

    // 3. Fetch goals
    const { data: goals } = await supabaseServer
      .from('goals')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('created_at', { ascending: false });

    // 4. Fetch check_ins for all goals
    let checkIns: any[] = [];
    if (goals && goals.length > 0) {
      const goalIds = goals.map((g: any) => g.id);
      const { data: checks } = await supabaseServer
        .from('check_ins')
        .select('*, goals(title)')
        .in('goal_id', goalIds)
        .order('created_at', { ascending: false })
        .limit(20);
      checkIns = checks || [];
    }

    return NextResponse.json({
      profile,
      messages: messages || [],
      goals: goals || [],
      checkIns,
    });
  } catch (error: any) {
    console.error('Sync GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Write messages or goals
export async function POST(req: Request) {
  try {
    const { action, walletAddress, payload } = await req.json();

    if (!walletAddress) {
      return NextResponse.json({ error: 'walletAddress required' }, { status: 400 });
    }

    // Ensure profile exists first
    const { data: existingProfile } = await supabaseServer
      .from('profiles')
      .select('wallet_address')
      .eq('wallet_address', walletAddress)
      .single();

    if (!existingProfile) {
      await supabaseServer
        .from('profiles')
        .insert([{ wallet_address: walletAddress }]);
    }

    if (action === 'add_message') {
      const { data, error } = await supabaseServer
        .from('messages')
        .insert([{
          wallet_address: walletAddress,
          content: payload.content,
          is_user: payload.is_user,
        }])
        .select()
        .single();

      if (error) {
        console.error('Insert message error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ data });
    }

    if (action === 'add_goal') {
      const { data, error } = await supabaseServer
        .from('goals')
        .insert([{
          wallet_address: walletAddress,
          title: payload.title,
          stake_amount: payload.stake_amount,
          duration_days: payload.duration_days,
          status: 'active',
        }])
        .select()
        .single();

      if (error) {
        console.error('Insert goal error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    console.error('Sync POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
