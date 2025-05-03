"use client";
import { useState,useRef, useEffect } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { ResultDisplay } from '@/components/search/result-display';
import { useToast } from '@/hooks/use-toast';
import { MessageBubble } from './message-bubble';
import { motion } from "framer-motion";

export type SystemPrompts = {
  role: "system" | "user";
  content:string;
  memory:string;
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
  const [userMemory , setUserMemory] = useState('');
  useEffect(() => {
    const memory = localStorage.getItem('memory') as string;
    setUserMemory(memory);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const createMessage = (role: "user" | "system", content: string,memory:string): SystemPrompts => ({
    role,
    content,
    memory
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
      const updatedMessages = [...messages, createMessage("user", prompt,userMemory)];
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

      setMessages([...updatedMessages, createMessage("system", data.text || " ",userMemory)]);
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
    const handlePageClick = () =>{
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-8rem)] w-full flex-col items-center justify-center"
    >
      <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Get instant, intelligent answers
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Search with AI to discover insights and get comprehensive answers
            to your questions
          </p>
        </motion.div>

        <div className="w-full space-y-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SearchBar
              prompt={prompt}
              setPrompt={setPrompt}
              onSearch={handleSearch}
              isLoading={isLoading}
              ref={inputRef}
              placeholder={messages.length === 0 ? "Ask Anything" : "Continue Asking"}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col space-y-4 max-h-[60vh] min-h-[200px] w-full overflow-y-auto rounded-lg bg-muted p-4"
          >
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <MessageBubble
                  role={msg.role}
                  content={msg.content}
                />
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </motion.div>

          {(result || isLoading) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultDisplay result={result} isLoading={isLoading} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}