"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { Course } from "@/data/courses";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";

const STORAGE_KEY = "freelearn-progress-v1";

// For each completed course id we remember the date it was confirmed,
// and optionally a link the student added as evidence.
type Progress = Record<string, { completedAt: string; certificateUrl?: string }>;

// Only normal web links are accepted, so nothing unsafe is stored or shown.
function cleanUrl(input: string): string | null {
  try {
    const url = new URL(input.trim());
    if (url.protocol === "https:" || url.protocol === "http:") {
      return url.toString();
    }
  } catch {
    // Not a valid link
  }
  return null;
}

function readLocal(): Progress {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        return parsed as Progress;
      }
    }
  } catch {
    // Unreadable saved data: start fresh
  }
  return {};
}

function writeLocal(next: Progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Saving can fail (e.g. private mode); the page still works for now
  }
}

export default function PathList({ courses }: { courses: Course[] }) {
  const { t } = useLanguage();
  const p = t.pathList;

  const [supabase] = useState<SupabaseClient | null>(() =>
    typeof window === "undefined" ? null : createClient()
  );
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // On page load: find out who is logged in, then load their progress
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const local = readLocal();
      let currentUser: User | null = null;
      if (supabase) {
        const { data } = await supabase.auth.getUser();
        currentUser = data.user;
      }
      if (cancelled) return;

      // Not logged in: progress stays in this browser
      if (!currentUser || !supabase) {
        setUser(null);
        setProgress(local);
        setLoaded(true);
        return;
      }

      // Logged in: the database is the source of truth
      setUser(currentUser);
      const { data: rows, error } = await supabase
        .from("completions")
        .select("course_id, completed_at, certificate_url");
      if (cancelled) return;

      if (error) {
        setSaveError("load");
        setLoaded(true);
        return;
      }

      const fromDb: Progress = {};
      for (const row of rows ?? []) {
        fromDb[row.course_id] = {
          completedAt: row.completed_at,
          ...(row.certificate_url ? { certificateUrl: row.certificate_url } : {}),
        };
      }

      // One-time merge of progress made while logged out
      const knownIds = new Set(courses.map((c) => c.id));
      const today = new Date().toISOString().slice(0, 10);
      const toUpload = Object.entries(local).filter(
        ([id]) => knownIds.has(id) && !fromDb[id]
      );
      if (toUpload.length > 0) {
        const payload = toUpload.map(([id, value]) => ({
          user_id: currentUser.id,
          course_id: id,
          completed_at: /^\d{4}-\d{2}-\d{2}$/.test(value.completedAt)
            ? value.completedAt
            : today,
          certificate_url: value.certificateUrl
            ? cleanUrl(value.certificateUrl)
            : null,
        }));
        const { error: uploadError } = await supabase
          .from("completions")
          .upsert(payload, { onConflict: "user_id,course_id" });
        if (!uploadError) {
          for (const item of payload) {
            fromDb[item.course_id] = {
              completedAt: item.completed_at,
              ...(item.certificate_url
                ? { certificateUrl: item.certificate_url }
                : {}),
            };
          }
          try {
            window.localStorage.removeItem(STORAGE_KEY);
          } catch {
            // Nothing to do if the browser refuses
          }
        }
      }

      if (cancelled) return;
      setProgress(fromDb);
      setLoaded(true);
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [supabase, courses]);

  async function markCompleted(id: string) {
    const raw = (evidence[id] ?? "").trim();
    let certificateUrl: string | undefined;

    if (raw) {
      const cleaned = cleanUrl(raw);
      if (!cleaned) {
        setErrors({ ...errors, [id]: "invalid" });
        return;
      }
      certificateUrl = cleaned;
    }

    setErrors({ ...errors, [id]: "" });
    setSaveError("");

    if (user && supabase) {
      setBusyId(id);
      const { data, error } = await supabase
        .from("completions")
        .upsert(
          {
            user_id: user.id,
            course_id: id,
            certificate_url: certificateUrl ?? null,
          },
          { onConflict: "user_id,course_id" }
        )
        .select("completed_at")
        .single();
      setBusyId(null);
      if (error || !data) {
        setSaveError("save");
        return;
      }
      setProgress({
        ...progress,
        [id]: {
          completedAt: data.completed_at,
          ...(certificateUrl ? { certificateUrl } : {}),
        },
      });
      return;
    }

    // Not logged in: save in this browser only
    const today = new Date().toISOString().slice(0, 10);
    const next = {
      ...progress,
      [id]: { completedAt: today, ...(certificateUrl ? { certificateUrl } : {}) },
    };
    setProgress(next);
    writeLocal(next);
  }

  async function undoCompletion(id: string) {
    setSaveError("");

    if (user && supabase) {
      setBusyId(id);
      const { error } = await supabase
        .from("completions")
        .delete()
        .eq("user_id", user.id)
        .eq("course_id", id);
      setBusyId(null);
      if (error) {
        setSaveError("undo");
        return;
      }
    }

    const next = { ...progress };
    delete next[id];
    setProgress(next);
    if (!user) writeLocal(next);
  }

  if (!loaded) {
    return <p className="mt-10 text-deep/60">{p.loading}</p>;
  }

  const saveErrorText =
    saveError === "load"
      ? p.loadError
      : saveError === "save"
        ? p.saveFail
        : saveError === "undo"
          ? p.undoFail
          : "";

  const completedCount = courses.filter((c) => progress[c.id]).length;
  const percent = Math.round((completedCount / courses.length) * 100);

  return (
    <div className="mt-10">
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-display text-lg font-bold">{p.progress}</span>
          <span className="text-sm text-deep/70">
            {p.completedOf(completedCount, courses.length)}
          </span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-sea transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-deep/70">
          {user ? (
            p.loggedIn
          ) : (
            <>
              {p.browserOnly}{" "}
              <Link
                href="/account"
                className="font-semibold text-sea underline underline-offset-4"
              >
                {p.loginLink}
              </Link>{" "}
              {p.loginSuffix}
            </>
          )}
        </p>
        {saveErrorText && (
          <p className="mt-2 text-sm font-semibold text-red-700">
            {saveErrorText}
          </p>
        )}
      </div>

      {completedCount === courses.length && (
        <p className="mt-6 rounded-2xl bg-sand p-4 font-medium">{p.wellDone}</p>
      )}

      <ol className="relative mt-10 space-y-6 border-l-2 border-dashed border-deep/25 pl-8">
        {courses.map((course, index) => {
          const isCompleted = Boolean(progress[course.id]);
          const previous = courses[index - 1];
          const isUnlocked = index === 0 || Boolean(progress[previous.id]);
          const next = courses[index + 1];
          // Undo is only allowed on the latest completed course,
          // so later courses never stay unlocked by mistake.
          const canUndo = isCompleted && !(next && progress[next.id]);
          const savedLink = progress[course.id]?.certificateUrl;
          const safeLink = savedLink ? cleanUrl(savedLink) : null;
          const isBusy = busyId === course.id;

          // French (or other) text for this course, with the English data as fallback
          const ct = p.courseText[course.id];
          const description = ct?.description ?? course.description;
          const duration = ct?.duration ?? course.duration;
          const subtitles = ct?.subtitles ?? course.subtitles;
          const account = ct?.account ?? course.accountRequired;
          const languageName = p.languageNames[course.language] ?? course.language;

          const markerBase =
            "absolute -left-[3.07rem] top-5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold";

          if (!isUnlocked) {
            return (
              <li key={course.id} className="relative">
                <span className={`${markerBase} bg-sand text-deep/60`}>
                  {course.order}
                </span>
                <div className="rounded-2xl border border-dashed border-deep/25 bg-sand/60 px-5 py-4">
                  <h2 className="font-display text-xl font-bold text-deep/60">
                    {course.title}
                  </h2>
                  <p className="text-sm text-deep/60">{course.provider}</p>
                  <p className="mt-2 text-sm font-semibold text-deep/70">
                    {p.locked(previous.order)}
                  </p>
                </div>
              </li>
            );
          }

          return (
            <li key={course.id} className="relative">
              <span
                className={`${markerBase} ${
                  isCompleted ? "bg-sea text-white" : "bg-saffron text-deep"
                }`}
              >
                {isCompleted ? "✓" : course.order}
              </span>

              <div
                className={`rounded-2xl bg-white p-6 ${
                  isCompleted
                    ? "border border-sea/30"
                    : "shadow-md ring-2 ring-saffron"
                }`}
              >
                <h2 className="font-display text-xl font-bold">
                  {course.title}
                </h2>
                <p className="text-sm text-deep/70">{course.provider}</p>

                <p className="mt-4">{description}</p>

                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelAccess}</dt>
                    <dd>{p.access[course.courseAccess] ?? course.courseAccess}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelReward}</dt>
                    <dd>{p.reward(course.rewardCost, course.rewardType)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelLevel}</dt>
                    <dd>
                      {p.level[course.level] ?? course.level} (
                      {course.levelSource === "provider"
                        ? p.levelProvider
                        : p.levelOurs}
                      )
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelDuration}</dt>
                    <dd>{duration}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelLanguage}</dt>
                    <dd>{languageName}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelSubtitles}</dt>
                    <dd>{subtitles}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelAccount}</dt>
                    <dd>{account}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">{p.labelVerified}</dt>
                    <dd>{course.lastVerified}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-sea px-6 py-2.5 text-sm font-semibold text-white hover:bg-deep"
                  >
                    {p.goTo(course.provider)}
                  </a>
                </div>

                {!isCompleted && (
                  <div className="mt-5 rounded-2xl bg-chalk p-4">
                    <label
                      htmlFor={`evidence-${course.id}`}
                      className="block text-sm font-semibold"
                    >
                      {p.evidenceLabel}
                    </label>
                    <input
                      id={`evidence-${course.id}`}
                      type="url"
                      placeholder="https://..."
                      value={evidence[course.id] ?? ""}
                      onChange={(e) =>
                        setEvidence({ ...evidence, [course.id]: e.target.value })
                      }
                      className="mt-2 w-full rounded-lg border border-deep/25 bg-white px-3 py-2 text-sm"
                    />
                    {errors[course.id] && (
                      <p className="mt-2 text-sm text-red-700">{p.invalidLink}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => markCompleted(course.id)}
                      disabled={isBusy}
                      className="mt-3 rounded-full border-2 border-sea px-6 py-2 text-sm font-semibold text-sea hover:bg-sea hover:text-white disabled:opacity-60"
                    >
                      {isBusy ? p.saving : p.markCompleted}
                    </button>
                    <p className="mt-3 text-xs text-deep/70">{p.openingNote}</p>
                  </div>
                )}

                {isCompleted && (
                  <div className="mt-5 space-y-2 text-sm">
                    <p className="font-semibold text-sea">
                      {p.completedOn(progress[course.id].completedAt)}
                    </p>
                    {safeLink && (
                      <p className="text-deep/80">
                        {p.evidenceNotVerified}{" "}
                        <a
                          href={safeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sea underline"
                        >
                          {p.open}
                        </a>
                      </p>
                    )}
                    {canUndo && (
                      <button
                        type="button"
                        onClick={() => undoCompletion(course.id)}
                        disabled={isBusy}
                        className="text-deep/70 underline hover:text-deep disabled:opacity-60"
                      >
                        {isBusy ? p.saving : p.undo}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}