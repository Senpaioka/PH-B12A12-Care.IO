import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import NextAuthProvider from '@/context/NextAuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "care.io",
//   description: "Baby Sitting & Elderly Care Service Platform",
// };

export const metadata = {
  title: {
    default: "Care.io | Trusted Baby Sitting & Elderly Care Services",
    template: "%s | Care.io",
  },

  description:
    "Care.io is a trusted platform connecting families with verified caregivers for baby sitting, elderly care, and home assistance services.",

  keywords: [
    "caregiver services",
    "baby sitting",
    "elderly care",
    "home care services",
    "hire caregiver",
    "nanny services",
    "senior care",
    "care.io",
  ],

  authors: [{ name: "Care.io Team" }],

  creator: "Care.io",

  publisher: "Care.io",

  metadataBase: new URL("https://ph-b12-a12-care-io.vercel.app"),

  openGraph: {
    title: "Care.io | Trusted Baby Sitting & Elderly Care Services",
    description:
      "Find verified caregivers for baby sitting and elderly care. Safe, reliable, and easy to book.",
    url: "https://ph-b12-a12-care-io.vercel.app",
    siteName: "Care.io",
    images: [
      {
        url: "/og-image.png", // place in /public
        width: 1200,
        height: 630,
        alt: "Care.io – Caregiving Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.io | Trusted Caregiving Services",
    description:
      "Hire trusted caregivers for baby sitting and elderly care with Care.io.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <NextAuthProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen`}>
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
    </GoogleOAuthProvider>
  );
}



