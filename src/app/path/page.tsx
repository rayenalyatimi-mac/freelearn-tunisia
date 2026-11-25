"use client";

import { courses } from "@/data/courses";
import PathList from "@/components/PathList";
import { useLanguage } from "@/components/LanguageProvider";

// Sorted once, so the path always follows the intended progression
const path = [...courses].sort((a, b) => a.order - b.order);

export default function PathPage() {
  const { t } = useLanguage();

  return (
    <main>
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t.path.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-deep/80">{t.path.intro}</p>
        <p className="mt-3 max-w-xl text-sm text-deep/70">{t.path.note}</p>

        <PathList courses={path} />

        <p className="mt-10 rounded-2xl border border-dashed border-deep/25 p-4 text-sm text-deep/70">
          {t.path.moreComing}
        </p>
      </div>
    </main>
  );
}