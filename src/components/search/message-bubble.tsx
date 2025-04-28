import React from "react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
    role:"user" | "system";
    content:string;
}

export function MessageBubble({role,content}:MessageBubbleProps){
    const isUser = role === "user";

    return (
        <div className={cn(
            'flex w-full',
            isUser ? 'justify-end':'justify-start'
        )}
        >
            <div className={cn(
                 'rounded-xl px-4 py-2 max-w-xs md:max-w-md break-words',
                 isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            )}>
               <p className="text-sm">{content}</p> 
            </div>
        </div>
    )
}