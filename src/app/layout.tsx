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
  title: {
    default: "피싱 방지 센터 - 보이스피싱 사례 공유",
    template: "%s | 피싱 방지 센터"
  },
  description: "실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다. 보이스피싱, 피싱, 사기 피해사례와 예방 방법을 확인하세요.",
  keywords: [
    "보이스피싱",
    "피싱",
    "사기",
    "피해사례",
    "예방",
    "사이버보안",
    "전화사기",
    "문자피싱",
    "링크피싱",
    "SNS피싱",
    "리뷰알바사기",
    "피싱방지",
    "사기예방",
    "피해신고"
  ],
  authors: [{ name: "피싱 방지 센터" }],
  creator: "피싱 방지 센터",
  publisher: "피싱 방지 센터",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "googleb30cc01a3c83afd5",
  },
  alternates: {
    canonical: "https://aga-blog.vercel.app",
  },
  openGraph: {
    title: "피싱 방지 센터 - 보이스피싱 사례 공유",
    description: "실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.",
    type: "website",
    locale: "ko_KR",
    url: "https://aga-blog.vercel.app",
    siteName: "피싱 방지 센터",
    images: [
      {
        url: "https://aga-blog.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "피싱 방지 센터",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "피싱 방지 센터 - 보이스피싱 사례 공유",
    description: "실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.",
    images: ["https://aga-blog.vercel.app/og-image.png"],
    creator: "@phishing_prevention",
  },
  category: "technology",
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
