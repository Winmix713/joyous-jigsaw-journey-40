
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar"; // Corrected casing
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar-fixed";
import { StoreProvider } from "@/lib/store-provider";
import "@/styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "WinMix.hu - Online Betting Platform",
  description: "The premier online betting platform for sports and eSports enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
        <StoreProvider>
          <SidebarProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pt-20">{children}</main>
              <Toaster />
            </div>
          </SidebarProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
