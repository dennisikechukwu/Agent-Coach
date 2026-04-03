import { cn } from "../lib/utils";
import { AgentAvatar } from "./AgentAvatar";


interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  className?: string;
}

export function ChatBubble({ message, isUser, className }: ChatBubbleProps) {
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start gap-3 items-end", className)}>
      {!isUser && <AgentAvatar className="w-10 h-10 text-xl" />}
      
      <div 
        className={cn(
          "max-w-[80%] px-5 py-3 shadow-md whitespace-pre-wrap break-words text-sm relative group",
          isUser 
            ? "bg-blue-600 text-white rounded-2xl rounded-tr-sm" 
            : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-tl-sm border border-zinc-100 dark:border-zinc-700"
        )}
      >
        {message}
        
        {/* Subtle timestamp hover placeholder */}
        <span className={cn(
          "absolute text-[10px] opacity-0 group-hover:opacity-100 transition-opacity -bottom-5",
          isUser ? "right-0 text-zinc-500" : "left-0 text-zinc-500"
        )}>
          Just now
        </span>
      </div>
    </div>
  );
}
