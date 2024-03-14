import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/styles.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Aside } from "./components/aside";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Chat",
  description: "Chat with my CV",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html className="h-screen" lang="en">
      <body className={`${inter.className} h-full flex flex-row !dark:bg-slate-100`}>
        <main className="w-full md:w-3/5">{children}</main>
        <aside className="hidden w-0 md:w-2/5 md:block bg-slate-900 border-l-2 overflow-auto">
          <Aside />
        </aside>
        <Analytics />
      </body>
    </html>
  );
}
