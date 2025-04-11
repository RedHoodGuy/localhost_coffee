import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'font-awesome/css/font-awesome.min.css';
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalHost Coffee",
  description: "e-Commerce website for LocalHost Coffee LLC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className={"items-center justify-items-center content"}>
        <Header />
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
