import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Ethan | Developer & Designer",
    template: "%s | Ethan",
  },
  description:
    "Personal portfolio of Ethan — a passionate developer and designer building thoughtful digital experiences with clean code and modern design.",
  keywords: ["developer", "designer", "portfolio", "web development", "UI/UX"],
  authors: [{ name: "Ethan" }],
  openGraph: {
    title: "Ethan | Developer & Designer",
    description:
      "Personal portfolio of Ethan — a passionate developer and designer building thoughtful digital experiences.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
