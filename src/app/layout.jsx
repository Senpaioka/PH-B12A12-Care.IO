import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import NextAuthProvider from '@/context/NextAuthProvider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "care.io",
  description: "World class care services at your door.",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="w-10/12 mx-auto md:p-5">
          <Navbar></Navbar>
        </header>

        <main className="w-10/12 mx-auto md:p-5">
          {children}
        </main>

        <footer className="w-10/12 mx-auto md:p-5">
          <Footer></Footer>
        </footer>
      </body>
    </html>
    </NextAuthProvider>
  );
}
