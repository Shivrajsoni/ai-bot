export function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-primary/10"></div>
          <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-2 border-transparent border-t-primary"></div>
        </div>
        <span className="ml-3 text-sm text-muted-foreground">
          Searching for results...
        </span>
      </div>
    );
  }