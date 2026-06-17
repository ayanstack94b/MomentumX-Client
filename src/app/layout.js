import { Inter, Oswald } from "next/font/google";
import "./globals.css";

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
      className={`${inter.variable} ${oswald.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#0B0B0D] text-white">
        {children}
      </body>
    </html>
  );
}
