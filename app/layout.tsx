import type { Metadata } from "next";
import { Fraunces, Lora, Inter } from "next/font/google";
import "./globals.css";

const bodySerif = Lora({
  variable: "--font-body-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const headingFont = Fraunces({
  variable: "--font-heading-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const monoFont = Inter({
  variable: "--font-sans-clean",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tầm Quan Trọng Của Việc Cầu Nguyện Trong Đời Sống Đức Tin Công Giáo",
  description: "Báo cáo nghiên cứu thần học sâu sắc về nền tảng, lịch sử cứu độ và các phương pháp thực hành tâm nguyện trong truyền thống Công giáo.",
  keywords: ["cầu nguyện", "Công giáo", "thần học", "đức tin", "tâm nguyện", "Thiên Chúa", "Giáo hội"],
  authors: [{ name: "Tầm Quan Trọng Cầu Nguyện" }],
  openGraph: {
    title: "Tầm Quan Trọng Của Việc Cầu Nguyện trong Đời Sống Công Giáo",
    description: "Khám phá chiều sâu thần học và các phương pháp thực hành cầu nguyện truyền thống.",
    type: "website",
    locale: "vi_VN",
    siteName: "Tầm Quan Trọng Cầu Nguyện",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tầm Quan Trọng Của Việc Cầu Nguyện",
    description: "Báo cáo nghiên cứu thần học về cầu nguyện trong đời sống đức tin Công giáo.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${bodySerif.variable} ${headingFont.variable} ${monoFont.variable} antialiased`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-yellow-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
        >
          Chuyển đến nội dung chính
        </a>
        {children}
      </body>
    </html>
  );
}
