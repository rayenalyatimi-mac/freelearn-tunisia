"use client";

import Link from "next/link";
import CreatorName from "@/components/CreatorName";
import { useLanguage } from "@/components/LanguageProvider";

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-deep/10">
      <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-deep/70">
        <p>
          {t.footer.line1}{" "}
          <strong className="font-semibold text-deep">
            <CreatorName />
          </strong>
          .{" "}
          <Link
            href="/about"
            className="font-semibold text-sea underline underline-offset-4"
          >
            {t.footer.about}
          </Link>
        </p>
        <p className="mt-1">{t.footer.line2}</p>
      </div>
    </footer>
  );
}