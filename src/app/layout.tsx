import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../Theme/ThemeProvider";
import ExpandProvider from "@/components/SidebarProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fintech",
  description: "Fintech Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="debug-screens dark:bg-[#141332]">
        <ExpandProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ExpandProvider>
      </body>
    </html>
  );
}
