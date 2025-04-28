// import { ChangeEvent, KeyboardEvent, useRef } from 'react';
// import { Search } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent } from '@/components/ui/card';


// interface SearchBarProps {
//   prompt: string;
//   setPrompt: (value: string) => void;
//   onSearch: () => void;
//   isLoading: boolean;// reference 
// }

// export function SearchBar({
//   prompt,
//   setPrompt,
//   onSearch,
//   isLoading,
// }: SearchBarProps) {
//   const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setPrompt(e.target.value);
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
//       e.preventDefault();
//       onSearch();
//     }
//   };


//   return (
//     <Card className="overflow-hidden border-2"> 
//       <CardContent className="p-0">
//         <div className="relative">
//           <Textarea
//             ref = {ref}
//             value={prompt}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask anything..."
//             className="min-h-24 resize-none border-0 p-4 text-base shadow-none focus:ring-0 md:text-lg"
//             disabled={isLoading}
//           />

//           <Button
//             className="absolute bottom-3 right-3 h-10 rounded-full px-4 sm:px-6"
//             onClick={onSearch}
//             disabled={isLoading}
//           >
//             <Search className="mr-2 h-4 w-4" />
//             <span>Search</span>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { ChangeEvent, KeyboardEvent, forwardRef } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface SearchBarProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

// ⚡ ForwardRef Magic
export const SearchBar = forwardRef<HTMLTextAreaElement, SearchBarProps>(
  ({ prompt, setPrompt, onSearch, isLoading }, ref) => {
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setPrompt(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearch();
      }
    };

    return (
      <Card className="overflow-hidden border-2">
        <CardContent className="p-0">
          <div className="relative">
            <Textarea
              ref={ref}
              value={prompt}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="min-h-24 resize-none border-0 p-4 text-base shadow-none focus:ring-0 md:text-lg"
              disabled={isLoading}
            />
            <Button
              className="absolute bottom-3 right-3 h-10 rounded-full px-4 sm:px-6"
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