import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/public/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Chat",
  description: "Chat with my CV",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full`}>
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </body>
    </html>
  );
}
