import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://mizzen-ai.com'),
  title: "MizzenAI - AI Data & Benchmark Solutions",
  description: "Leading AI data company providing high-quality datasets, model evaluation, and benchmark solutions for next-generation AI systems.",
  keywords: "AI data, machine learning, data labeling, model evaluation, RLHF, benchmark, annotation, AI training",
  authors: [{ name: "MizzenAI" }],
  openGraph: {
    title: "MizzenAI - AI Data & Benchmark Solutions",
    description: "Leading AI data company providing high-quality datasets, model evaluation, and benchmark solutions for next-generation AI systems.",
    url: "https://mizzen-ai.com",
    siteName: "MizzenAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MizzenAI - AI Data & Benchmark Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MizzenAI - AI Data & Benchmark Solutions",
    description: "Leading AI data company providing high-quality datasets, model evaluation, and benchmark solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased transition-colors">
        <Navigation />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
