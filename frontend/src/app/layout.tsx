import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './hooks/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opinion Drop",
  description: "Platform designed to foster thoughtful discussions and diverse perspectives on various topics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          
          {/* Favicons */}
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
          
          
          {/* Additional Favicon Sizes for Android */}
          <link rel="icon" type="image/png" sizes="192x192" href="/images/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/images/android-chrome-512x512.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        </body>
    </html>
  );
}
