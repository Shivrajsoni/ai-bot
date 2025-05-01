import { ThemeProvider } from "@/components/theme/theme-provider";
import { Layout } from "@/components/layout/layout";
import { Toaster } from "@/components/ui/toaster";
import { SearchPage } from "@/components/search/search-page";

export default function Home() {
  return(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <Layout>
      <SearchPage />
    </Layout>
    <Toaster />
  </ThemeProvider>
  )
}
