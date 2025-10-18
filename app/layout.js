import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Inter } from "next/font/google";
import Script from "next/script"; // ✅ import Next.js Script component

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    default: "LangMaster | Learn Nigerian Languages with AI",
    template: "%s | LangMaster",
  },
  description:
    "LangMaster helps you learn and connect with Nigeria’s indigenous languages through AI-powered lessons, cultural immersion, and gamified learning experiences.",
  keywords: [
    "LangMaster",
    "Nigerian languages",
    "AI tutor",
    "Nigeria AI",
    "learning platform",
    "Nigeria language learning website",
    "language learning app",
    "Yoruba",
    "Igbo",
    "Hausa",
    "culture",
  ],
  authors: [{ name: "LangMaster Team", url: "https://thelangmaster.com" }],
  metadataBase: new URL("https://thelangmaster.com"),
  alternates: {
    canonical: "https://thelangmaster.com",
  },
  openGraph: {
    title: "LangMaster — Learn Nigerian Languages with AI",
    description:
      "Experience AI-powered learning for Yoruba, Igbo, Hausa and more. Join the cultural revolution with LangMaster.",
    url: "https://thelangmaster.com",
    siteName: "LangMaster",
    images: [
      {
        url: "https://www.thelangmaster.com/lmm.png",
        width: 1200,
        height: 630,
        alt: "LangMaster — AI Language Tutor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LangMaster — Learn Nigerian Languages with AI",
    description:
      "Gamified language learning powered by AI. Learn Yoruba, Igbo, Hausa & more — one culture at a time.",
    creator: "@langmaster_connect",
    images: ["/favicon.png"],
  },
  themeColor: "#047857",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
  },
  verification: {
    google: "P5P5x2wkEiR6NpMhZX4GIK_hIvYmM_otP5VsKM8p0uA",
  },
};

export default function RootLayout({ children }) {
  if (typeof window !== "undefined" && window.location.pathname !== "/waitlist") {
    window.location.href = "/waitlist";
  }

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-white text-black dark:bg-[#111827] dark:text-white transition-colors duration-300 antialiased selection:bg-[#22C55E]/30">
        {/* Google Analytics setup */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q9R09S5L05"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q9R09S5L05', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
