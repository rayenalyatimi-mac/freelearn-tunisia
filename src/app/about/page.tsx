"use client";

import CreatorName from "@/components/CreatorName";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        {a.title}
      </h1>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">{a.whyTitle}</h2>
        <p className="mt-2 text-deep/80">{a.whyText}</p>
        <p className="mt-3 font-semibold">
          <CreatorName />
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">{a.howTitle}</h2>
        <p className="mt-2 text-deep/80">{a.howText}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">{a.progressTitle}</h2>
        <p className="mt-2 text-deep/80">{a.progressText}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">{a.freeTitle}</h2>
        <p className="mt-2 text-deep/80">
          {a.freeText}{" "}
          <a
            href="https://github.com/rayenalyatimi-mac/freelearn-tunisia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sea underline underline-offset-4"
          >
            {a.github}
          </a>
          .
        </p>
      </section>
    </main>
  );
}