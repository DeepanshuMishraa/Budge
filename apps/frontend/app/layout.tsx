import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Poppins } from "next/font/google"
import { ThemeProvider } from "./theme-provider";

export const metadata: Metadata = {
  title: "Budge",
  description: "Manage your expenses like never before",
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["200", "400", "600", "800"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
