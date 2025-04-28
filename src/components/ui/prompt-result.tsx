import React from "react";

interface PromptResultProps {
    result:string;
}
export const PromptResult:React.FC<PromptResultProps> = ({result}) =>{
    if(!result) return null;

    return (
        <div className="mt-6 p-4 bg-muted text-foreground rounded-md max-w-xl mx-auto animate-fadeIn">
            <h2 className="text-lg font-semibold mb-2">Result : </h2>
            {result}
        </div>
    )
}