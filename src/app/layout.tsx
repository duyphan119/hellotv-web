import Footer from "@/components/footer";
import Header from "@/components/header";
import QueryProvider from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ScrollToTop from "@/components/scroll-to-top";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { cn } from "@/lib/utils";
import categoryApi from "@/features/categories/api";
import countryApi from "@/features/countries/api";
import CommonDataProvider from "@/components/providers/common-data-provider";
import yearApi from "@/features/years/api";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Hellotv",
  description: "Hellotv - Web xem phim miễn phí",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const results = await Promise.allSettled([
    categoryApi.fetchCategoriesData(),
    countryApi.fetchCountriesData(),
  ]);
  return (
    <QueryProvider>
      <CommonDataProvider
        categories={results[0].status === "fulfilled" ? results[0].value : []}
        countries={results[1].status === "fulfilled" ? results[1].value : []}
        years={yearApi.fetchYearsData()}
      >
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "flex flex-col min-h-screen antialiased",
              roboto.className
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader color="hsl(var(--primary))" />
              <Header />
              <main className="flex-1 _bg-layout">
                <div className="_container _bg-container space-y-4 sm:space-y-6 md:space-y-8 py-4 sm:py-6 md:py-8">
                  <p className="_bg-layout font-medium text-xs text-yellow-600 text-center px-4 py-2">
                    KHI NỘI DUNG KHÔNG HIỂN THỊ, HÃY THỬ BẤM F5 HOẶC TẢI LẠI
                    TRANG VÀI LẦN NHÉ.
                  </p>
                  {children}
                </div>
              </main>
              <Footer />
              <ScrollToTop />
            </ThemeProvider>
          </body>
        </html>
      </CommonDataProvider>
    </QueryProvider>
  );
}
