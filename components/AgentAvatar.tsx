import { cn } from "../lib/utils";

interface AgentAvatarProps {
  className?: string;
  emoji?: string; // Kept for backwards compat but ignored
}

export function AgentAvatar({ className }: AgentAvatarProps) {
  return (
    <div className={cn("relative shrink-0 rounded-full overflow-hidden border border-white/10 shadow-sm bg-black flex", className)}>
      <img 
        src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=256&auto=format&fit=crop" 
        alt="AgentCoach Logo" 
        className="w-full h-full object-cover grayscale opacity-90"
      />
    </div>
  );
}
