import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/components/fonts";

export const metadata: Metadata = {
  title: "Aplikasi Pendataan Penduduk",
  description: "Aplikasi Pendataan Penduduk Kewilayahan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
