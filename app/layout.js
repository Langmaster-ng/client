import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Inter } from "next/font/google";

// ✅ Modern, legible Google font (auto-optimal subset)
const inter = Inter({ subsets: ["latin"], display: "swap" });

/**
 * ✅ Default SEO metadata
 * You can dynamically override per page using export const metadata in each page file
 */
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
        url: "/favicon.png", // put this in your /public folder
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
    google: "YOUR_GOOGLE_SITE_VERIFICATION_ID", // optional
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-white text-black dark:bg-[#111827] dark:text-white transition-colors duration-300 antialiased selection:bg-[#22C55E]/30">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
