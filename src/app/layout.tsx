import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excample Form by Karol Has",
  description: "Everdome Frontend Recruiment task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(openSans.className, "text-gray-700")}>
        {children}
      </body>
    </html>
  );
}
