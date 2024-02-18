import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FileProvider } from "./(app)/context/FileContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marill - chat with notes",
  description: "Marill - chat with notes , here you can chat with notes and get answers from AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FileProvider>
        {children}
        </FileProvider>
        </body>
    </html>
  );
}
