"use client";
import { useState,useRef, useEffect } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { ResultDisplay } from '@/components/search/result-display';
import { useToast } from '@/hooks/use-toast';
import { MessageBubble } from './message-bubble';

export type SystemPrompts = {
  role: "system" | "user";
  content:string;
}

export function SearchPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const maxToken = 4000;
  const [messages, setMessages] = useState<SystemPrompts[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const createMessage = (role: "user" | "system", content: string): SystemPrompts => ({
    role,
    content,
  });
  
  const handleSearch = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Empty Query',
        description: 'Please enter a search query',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setResult('');

    try {
      const updatedMessages = [...messages, createMessage("user", prompt)];
      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages}),
      });

      const data: { text?: string } = await response.json();
      const tokenUsed = data.text?.split(' ').length || 100;

      if (tokenUsed > maxToken) {
        toast({
          title: 'Token Limit Exceeded',
          description: `Used ${tokenUsed} tokens (limit: ${maxToken})`,
          variant: 'destructive',
        });
      }

      setMessages([...updatedMessages, createMessage("system", data.text || " ")]);
      setResult(data.text || "");
      toast({
        title: 'Search Complete',
        description: 'Results are ready to view',
      });
    } catch (error) {
      console.error('Error fetching prompt response', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch results. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{
    const handlePageClick = (e:MouseEvent) =>{
      if(inputRef.current){
        inputRef.current.focus();
      }
    };
    document.addEventListener('click',handlePageClick);
    return ()=>{
      document.removeEventListener('click',handlePageClick);
    }
  },[])

  return (
    <div className="container inset-0 flex flex-col items-center px-4 py-10 justify-center  md:py-16">
      <div className="mb-10 max-w-3xl text-center justify-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl justify-center">
          Get instant, intelligent answers
        </h1>
        <p className="mb-6 text-lg text-muted-foreground md:text-xl">
          Search with AI to discover insights and get comprehensive answers
          to your questions
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-6">
        <SearchBar
          prompt={prompt}
          setPrompt={setPrompt}
          onSearch={handleSearch}
          isLoading={isLoading}
          ref = {inputRef}
          placeholder = {messages.length === 0 ?"Ask Anything":"Continue Asking"}
        />
          <div className="flex flex-col space-y-4 max-h-[500px] overflow-y-auto p-4 rounded-md bg-muted">
            {messages.map((msg, idx) => (
              <MessageBubble
              key={idx}
              role={msg.role}
              content={msg.content}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {(result || isLoading) && (
          <ResultDisplay result={result} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}