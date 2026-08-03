import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Money Date with Esther Odejobi 2.0 | Beyond Money: Building a Life That Thrives",
  description: "Join us for Money Date 2.0 on Saturday, 10th October 2026 at The Zone, Gbagada, Lagos. The premium biannual financial wellness experience merging wealth growth, personal wellness, and intentional living.",
  keywords: "Money Date, Esther Odejobi, Financial Growth, Wellness, Intentional Living, Finance Conference Nigeria, Gbagada, Lagos",
  openGraph: {
    title: "Money Date with Esther Odejobi 2.0",
    description: "Beyond Money: Building a Life That Thrives. Saturday, 10th October 2026 at The Zone, Gbagada, Lagos. Register now.",
    type: "website",
  }
};

export default function MoneyDateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${lexendDeca.variable} min-h-full bg-[#001333] text-white font-sans overflow-x-hidden`}>
      {children}
    </div>
  );
}
