import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 w-full pb-24">{children}</main>
      <Footer />
    </div>
  );
}