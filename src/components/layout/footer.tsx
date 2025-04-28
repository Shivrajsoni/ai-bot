export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t py-6 md:py-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 md:flex-row md:justify-between">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Erite. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}