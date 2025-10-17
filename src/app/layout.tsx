import Providers from "@/components/atoms/Providers";
import VisitTracker from "@/components/atoms/VisitTracker";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "피싱 방지 센터 - 보이스피싱 사례 공유",
  description: "실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.",
  keywords: "보이스피싱, 피싱, 사기, 피해사례, 예방, 사이버보안",
  authors: [{ name: "피싱 방지 센터" }],
  openGraph: {
    title: "피싱 방지 센터 - 보이스피싱 사례 공유",
    description: "실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "피싱 방지 센터 - 보이스피싱 사례 공유",
    description: "실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased bg-secondary-50`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <VisitTracker />
          </div>
        </Providers>
      </body>
    </html>
  );
}
