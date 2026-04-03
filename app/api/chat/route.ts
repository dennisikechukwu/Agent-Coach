import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabaseServer } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { message, walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    }
    
    if (!apiKey) {
      return NextResponse.json({ 
        response: 'Configuration Error: GEMINI_API_KEY is missing from your .env.local file. Please add it.' 
      });
    }

    // Initialize Gemini Model with System Prompt
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are AgentCoach, a high-stakes, strict, and extremely motivating AI accountability partner for a Web3 app. 
      Your job is to hold users to their goals involving real money stakes (USDC).
      
      CRITICAL INSTRUCTION: If the user says they want to set a goal, or explicitly types the command "/goal" followed by a goal description, you MUST include the exact text "[MOONPAY_TRIGGER]" anywhere in your response. 
      This is a system command that tells the frontend to render the MoonPay Fiat-to-Crypto Checkout UI so they can lock in their stake. Tell them to use the checkout link below to lock their stake.
      
      Example response for '/goal code 2 hours daily $50':
      "**Goal Setup In Progress**
      I see you want to commit 2 hours daily to coding. That's a great goal, but talk is cheap. To lock this in, you need to stake your $50 USDC over the base network.
      
      [MOONPAY_TRIGGER]"
      
      Keep all responses punchy, confident, and direct. Use emojis appropriately. If they ask for /status or /help, provide clear status or available commands.`
    });

    // 1. Fetch recent conversation history from Supabase to give Gemini context
    let formattedHistory: any[] = [];
    try {
      const { data: history } = await supabaseServer
        .from('messages')
        .select('content, is_user')
        .eq('wallet_address', walletAddress)
        .order('created_at', { ascending: false })
        .limit(10);

      if (history && history.length > 0) {
        let mapped = history.reverse().map((msg: any) => ({
          role: msg.is_user ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }));
        
        // Remove the current message we're about to send (last user msg)
        if (mapped.length > 0 && mapped[mapped.length - 1].role === 'user') {
          mapped.pop();
        }

        // Gemini requires history to start with 'user' role — strip leading 'model' messages
        while (mapped.length > 0 && mapped[0].role === 'model') {
          mapped.shift();
        }

        formattedHistory = mapped;
      }
    } catch (e) {
      console.error("DB Fetch Error (Optional)", e);
    }

    // 2. Start Chat Session
    const chat = model.startChat({
       history: formattedHistory,
    });

    // 3. Send Message to Gemini
    const result = await chat.sendMessage(message);
    const textResponse = result.response.text();

    // 4. Save AI Response back to Supabase Persistent DB
    try {
      await supabaseServer.from('messages').insert([{
        wallet_address: walletAddress,
        content: textResponse,
        is_user: false
      }]);
    } catch (e) {
      console.error("Failed to commit AI message to persistence: ", e);
    }

    // 5. Return to frontend widget
    return NextResponse.json({ response: textResponse });

  } catch (error: any) {
    console.error("Generative AI Route Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
