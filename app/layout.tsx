
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import {ConvexClientProvider} from "@/components/providers/convex-provider";
import {ModalProvider} from "@/components/providers/modal-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "The connected workspace where better, faster work happens",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/bnote-light.png",
        href: "/bnote-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/bnote-dark.png",
        href: "/bnote-dark.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <ConvexClientProvider>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="bnote-theme-2"
        >
          <Toaster position="bottom-center" />
          <ModalProvider />
          {children}
        </ThemeProvider>
      </ConvexClientProvider>
      </body>
    </html>
  );
}
