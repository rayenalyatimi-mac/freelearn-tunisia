import type { Metadata } from "next";
import Link from "next/link";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});
const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const siteUrl = "https://freelearn-tunisia.vercel.app";
const title = "FreeLearn Tunisia: free courses, checked one by one";
const description =
  "A free learning path for Tunisian university students. Every course is checked on its official page, with the course and the certificate priced separately.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "FreeLearn Tunisia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <header className="border-b border-deep/10">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-display text-lg font-bold text-deep">
              FreeLearn Tunisia
            </Link>
            <nav className="flex items-center gap-5">
              <Link
                href="/path"
                className="text-sm font-semibold text-sea hover:underline"
              >
                Digital Marketing path
              </Link>
              <Link
                href="/account"
                className="rounded-full border-2 border-sea px-4 py-1.5 text-sm font-semibold text-sea hover:bg-sea hover:text-white"
              >
                Account
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-deep/10">
          <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-deep/70">
            <p>
              A free, non-profit student project by{" "}
              <strong className="font-semibold text-deep">
                Mouhamed Rayen Alyatimi
              </strong>
              .{" "}
              <Link
                href="/about"
                className="font-semibold text-sea underline underline-offset-4"
              >
                About
              </Link>
            </p>
            <p className="mt-1">
              Not affiliated with the course providers. Always confirm prices
              and conditions on the provider&apos;s own page.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}