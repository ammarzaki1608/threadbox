import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THREADBOX — Malaysian Streetwear, Told Through Place",
  description:
    "Limited-run streetwear organized by geography — Malaysia, state, district, landmark, culture, food, festival. Currently dropping: Malaysia (Merdeka), Penang, Balik Pulau, and Hostel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg-black text-bg-white antialiased">
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
