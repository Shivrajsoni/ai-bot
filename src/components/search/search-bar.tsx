
import { ChangeEvent, KeyboardEvent, forwardRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface SearchBarProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  placeholder?:string
}

// ⚡ ForwardRef Magic
export const SearchBar = forwardRef<HTMLTextAreaElement, SearchBarProps>(
  ({ prompt, setPrompt, onSearch, isLoading,placeholder }, ref) => {
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearch();
      }
    };
    
    const [isFocused,setIsFocused] = useState(false);

    return (
      <Card className={`relative border-3 p-2 rounded-lg transition-all duration-300 ${isFocused ? 'border-gray-500 shadow-md' : 'border-gray-300'}`} >
        <CardContent className="p-0">
          <div className="relative">
            <Textarea
              ref={ref}
              onFocus={()=>setIsFocused(true)}
              value={prompt}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || "Ask Anything .."}
              className="min-h-24 resize-none border-0 p-4 text-base shadow-none focus:ring-0 md:text-lg"
              disabled={isLoading}
            />
            <Button
              className="absolute bottom-3 right-3 h-10 rounded-lg px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white transition-all duration-300 sm:px-6" 
              onClick={onSearch}
              disabled={isLoading}
            >
              <Search className="mr-2 h-4 w-4" />
              <span>Search</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

SearchBar.displayName = 'SearchBar'; // 👈 important for Next.js + forwardRef