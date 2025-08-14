import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QueryProvider from "@/components/providers/query-provider";
import ScrollToTop from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hellotv",
  description: "Hellotv - Web xem phim miễn phí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="hsl(var(--primary))" />
            <Header />
            <main className="min-h-[calc(100vh-4rem)] bg-gray-900">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
