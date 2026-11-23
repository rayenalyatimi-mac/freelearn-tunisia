"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function SiteHeader() {
  const { lang, setLang, t } = useLanguage();

  const langButton = (code: "en" | "fr") => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
        lang === code ? "bg-sea text-white" : "text-sea hover:bg-sand"
      }`}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <header className="border-b border-deep/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-5 gap-y-2 px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold text-deep">
          FreeLearn Tunisia
        </Link>
        <nav className="flex items-center gap-4 sm:gap-5">
          <Link
            href="/path"
            className="text-sm font-semibold text-sea hover:underline"
          >
            <span className="sm:hidden">{t.nav.pathShort}</span>
            <span className="hidden sm:inline">{t.nav.pathFull}</span>
          </Link>
          <Link
            href="/account"
            className="rounded-full border-2 border-sea px-4 py-1.5 text-sm font-semibold text-sea hover:bg-sea hover:text-white"
          >
            {t.nav.account}
          </Link>
          <div
            role="group"
            aria-label={t.nav.language}
            className="flex items-center"
          >
            {langButton("en")}
            {langButton("fr")}
          </div>
        </nav>
      </div>
    </header>
  );
}