"use client";
import { useState } from 'react';
import { SearchBar } from '@/components/search/search-bar';
import { ResultDisplay } from '@/components/search/result-display';
import { useToast } from '@/hooks/use-toast';

export function SearchPage() {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const maxToken = 256;

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
      // Simulated API call (replace with actual API)
      setTimeout(() => {
        const mockResponse = {
          text: `Here's a detailed answer to your query about "${prompt}". This response contains information that would typically come from an AI model like those used by Perplexity. The quality and length of this response would vary based on the complexity of your query and available information. For demonstration purposes, this is a placeholder result.`,
        };

        const tokenUsed = mockResponse.text.split(' ').length;

        if (tokenUsed > maxToken) {
          toast({
            title: 'Token Limit Exceeded',
            description: `Used ${tokenUsed} tokens (limit: ${maxToken})`,
            variant: 'destructive',
          });
        }

        setResult(mockResponse.text);
        toast({
          title: 'Search Complete',
          description: 'Results are ready to view',
        });
        setIsLoading(false);
      }, 1500);
       
      const response = await fetch('/api/prompt', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const result = await response.json();
      const tokenUsed = result.text.split(' ').length;

      if (tokenUsed > maxToken) {
        toast({
          title: 'Token Limit Exceeded',
          description: `Used ${tokenUsed} tokens (limit: ${maxToken})`,
          variant: 'destructive',
        });
      }
      setResult(result.text);
      
    } catch (error) {
      console.error('Error fetching prompt response', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch results. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center px-4 py-10 md:py-16">
      <div className="mb-10 max-w-3xl text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
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
        />

        {(result || isLoading) && (
          <ResultDisplay result={result} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}