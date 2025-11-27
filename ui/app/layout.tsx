import type { Metadata } from "next";
import { Saira } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI Calendar Demo",
  description: "AI Calendar Demo.",
};

const sairaSans = Saira({
  variable: "--font-saira-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sairaSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <footer className="w-full flex items-center justify-between gap-8 py-5 border-t-2 fixed bottom-0 bg-gray-100 px-8">
            <div />
            <div className="flex items-center gap-8">
              <a href="https://www.linkedin.com/in/james-bales-827a558/">
                <LinkedInLogoIcon
                  className="text-muted-foreground"
                  width={30}
                  height={30}
                />
              </a>
              <a href="https://github.com/jmbsoftwaresolutions">
                <GitHubLogoIcon
                  className="text-muted-foreground"
                  width={30}
                  height={30}
                />
              </a>
              <Button>
                <Link
                  target="_blank"
                  href="https://jmbsoftwaresolutions.dev/contact"
                >
                  Contact
                </Link>
              </Button>
            </div>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
