import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, PT_Serif } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const ptSerif = PT_Serif({
  subsets: ["latin"],
  variable: "--font-pt-serif",
  weight: "400"
});

export const metadata: Metadata = {
  title: "snippit",
  description: "Find documentation quickly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} ${ptSerif.variable} antialiased`}
      >
        <div className="flex mt-2 justify-end w-full max-w-2xl">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
