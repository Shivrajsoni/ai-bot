import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface ResultDisplayProps {
  result: string;
  isLoading: boolean;
}

export function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  const formatText = (text: string) => {
    // Split the text into sections based on markdown-like patterns
    const sections = text.split(/(?=#{1,6}\s|```|`)/);
    
    return sections.map((section, index) => {
      // Handle headings
      if (section.startsWith('#')) {
        const level = section.match(/^#+/)?.[0].length || 1;
        const headingText = section.replace(/^#+\s*/, '');
        return (
          <h2 
            key={index} 
            className={cn(
              "font-bold mb-4",
              level === 1 && "text-2xl",
              level === 2 && "text-xl",
              level === 3 && "text-lg",
              level === 4 && "text-base",
              level === 5 && "text-sm",
              level === 6 && "text-xs"
            )}
          >
            {headingText}
          </h2>
        );
      }
      
      // Handle code blocks
      if (section.startsWith('```')) {
        const codeMatch = section.match(/```(\w*)\n([\s\S]*?)```/);
        if (codeMatch) {
          const [ code] = codeMatch;
          return (
            <pre key={index} className="bg-muted p-4 rounded-lg my-4 overflow-x-auto">
              <code className="text-sm font-mono">{code}</code>
            </pre>
          );
        }
      }
      
      // Handle inline code
      if (section.startsWith('`')) {
        const codeMatch = section.match(/`([^`]+)`/);
        if (codeMatch) {
          return (
            <code key={index} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
              {codeMatch[1]}
            </code>
          );
        }
      }
      
      // Handle regular paragraphs
      return (
        <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
          {section}
        </p>
      );
    });
  };

  return (
    <Card className="border-2 transition-all duration-300 ease-in-out">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Result</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-24 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {formatText(result)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}