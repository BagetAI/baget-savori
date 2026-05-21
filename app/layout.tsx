import type { Metadata } from "next";
import { Sora, Karla } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });

export const metadata: Metadata = {
  title: "Savori | Global Flavor, Zero Waste",
  description: "Chef-curated international spice kits delivered to your door. Pre-portioned for one dinner, designed for zero waste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${karla.variable} font-sans bg-[#F0EDFF] text-[#4C1D95]`}>
        {children}
      </body>
    </html>
  );
}
