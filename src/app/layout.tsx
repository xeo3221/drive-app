import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { PostHogProvider } from "./_providers/posthog-provider";
import { Toaster } from "~/components/ui/toaster";
export const metadata: Metadata = {
  title: "Drive App",
  description: "Super simple Google Drive alike app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <PostHogProvider>
          <body>
            {children}
            <Toaster />
          </body>
        </PostHogProvider>
      </html>
    </ClerkProvider>
  );
}
