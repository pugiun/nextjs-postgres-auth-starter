import "src/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionContextProvider } from "./providers";
let title = "Next.js + Postgres Auth Starter";
let description =
  "This is a Next.js starter kit that uses NextAuth.js for simple email + password login and a Postgres database to persist the data.";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionContextProvider>
          <div className="flex h-screen bg-gradient-to-r from-slate-300 to-slate-500">
            {children}
          </div>
        </SessionContextProvider>
      </body>
    </html>
  );
}
