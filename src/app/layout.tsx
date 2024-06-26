import "./globals.css";

import AuthContext from "@/context/AuthContext";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Open_Sans } from "next/font/google";
import SWRConfigCotext from "@/context/SWRConfigCotext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instagram",
    template: "%s | Instagram",
  },
  description: "Instagram Photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full bg-neutral-50 overflow-auto ">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex justify-center max-w-screen-xl mx-auto">
            <SWRConfigCotext>{children}</SWRConfigCotext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
