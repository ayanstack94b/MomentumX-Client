import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: {
    default: "MomentumX",
    template: "%s | MomentumX",
  },
  description:
    "MomentumX is a modern fitness and gym management platform for members, trainers, and administrators.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${oswald.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#0B0B0D] text-white">
        <Navbar></Navbar>
        <main className="flex-1 py-24">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
