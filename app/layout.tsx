import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next/metadata"; // If using Next.js App Router

// Recommended: Add metadata for global SEO
export const metadata = {
  title: "Esther Odejobi | Financial Educator & Wellness Coach in Nigeria",
  description: "Esther Odejobi helps students, young professionals, entrepreneurs, and earners in Nigeria build wealth, manage debt, invest wisely, and achieve financial wellness without burnout.",
  keywords: "financial coach Nigeria, financial literacy Nigeria, wealth building Nigeria, invest in Nigeria, debt management Nigeria, budgeting tips Nigeria, financial wellness coach, money mindset Nigeria, personal finance coach Lagos",
  openGraph: {
    title: "Esther Odejobi - Financial Education, Coaching & Wealth Wellness",
    description: "Join the Wealth & Wellness Community for practical finance tips, investment education, accountability, and mindset support tailored for Nigerians.",
    url: "https://www.estherodejobi.com", // Replace with actual domain
    type: "website",
  },
  alternates: {
    canonical: "https://www.estherodejobi.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Core SEO improvements */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon (add your own) */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}