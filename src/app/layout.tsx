import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salman Khan | Full-Stack Developer & AI/ML Developer",
  description:
    "Portfolio of Salman Khan, a full-stack developer building modern web applications, AI-powered platforms, real-time systems and practical software solutions.",
  keywords: [
    "Salman Khan",
    "Full-Stack Developer",
    "AI Developer",
    "Machine Learning",
    "Next.js",
    "FastAPI",
    "React",
    "Node.js",
    "Mumbai",
    "VITALS",
  ],
  authors: [{ name: "Salman Khan" }],
  creator: "Salman Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://salmankhan.dev",
    title: "Salman Khan | Full-Stack Developer & AI/ML Developer",
    description:
      "Full-stack developer focused on building scalable web applications, AI-powered products, real-time systems, and practical developer solutions.",
    siteName: "Salman Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salman Khan | Full-Stack Developer & AI/ML Developer",
    description:
      "Full-stack developer focused on building scalable web applications, AI-powered products, real-time systems, and practical developer solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-cyan-500/20 selection:text-cyan-300 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
