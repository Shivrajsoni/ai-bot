import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Button } from '../ui/button';

interface ResultDisplayProps {
  result: string;
  isLoading: boolean;
}

export function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  return (
    <>
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
          <div className="leading-relaxed text-muted-foreground">
            {result.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    
  </>
  );
}