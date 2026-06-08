import type { Metadata } from "next";
import { Space_Grotesk, Great_Vibes, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE WIE — Debugging the Gender Gap",
  description:
    "IEEE Women in Engineering — empowering women, engineering the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${greatVibes.variable} ${pixelifySans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
