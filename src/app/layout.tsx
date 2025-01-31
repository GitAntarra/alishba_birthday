import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BtnButton from "./components/BtnButton";
import { ReduxProvider } from "@/redux/ReduxProvider";
import MusicComponent from "./components/Music";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alishba Birthday",
  description: "High Five From Alishba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-md md:max-w-none mx-auto antialiased bg-[repeating-linear-gradient(90deg,#fde9e8_0px,#fde9e8_20px,#fdfcde_20px,#fdfcde_40px)] relative`}
      >
        <ReduxProvider>
          <Suspense fallback={<p>Loading...</p>}>
            {children}
            <BtnButton />
            <MusicComponent />
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
