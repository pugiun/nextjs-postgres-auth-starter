import "src/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import {
  IsMarriedProvider,
  SessionContextProvider,
  ThemeProvider,
} from "./providers";
import Link from "next/link";
let title = "Slicing Exercise";
let description = "Slicing exercise";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <IsMarriedProvider>
              <main className="flex min-h-screen w-full md:w-screen h-full bg-gradient-to-r from-slate-300 to-slate-500 text-gray-950">
                <Link href="/" className="fixed border px-8 py-2 left-4 top-2">
                  LOGO
                </Link>
                {children}
                <Toaster />
              </main>
            </IsMarriedProvider>
          </ThemeProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
