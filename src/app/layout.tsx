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

export const metadata: Metadata = {
  title: "FreeLearn Tunisia",
  description:
    "Free online courses, checked one by one, in a clear learning path for Tunisian university students.",
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
            <nav>
              <Link
                href="/path"
                className="text-sm font-semibold text-sea hover:underline"
              >
                Digital Marketing path
              </Link>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-deep/10">
          <p className="mx-auto max-w-5xl px-6 py-6 text-sm text-deep/70">
            A free student project. Not affiliated with the course providers.
            Always confirm prices and conditions on the provider&apos;s own page.
          </p>
        </footer>
      </body>
    </html>
  );
}