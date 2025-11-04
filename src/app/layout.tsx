import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "Reveel - Competitive Intelligence Platform",
  description: "Monitor competitor websites, detect changes instantly, and get AI-powered insights to make smarter business decisions",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
