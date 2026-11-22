"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/data/courses";

const STORAGE_KEY = "freelearn-progress-v1";

// For each completed course id we remember the date it was confirmed,
// and optionally a link the student added as evidence.
type Progress = Record<string, { completedAt: string; certificateUrl?: string }>;

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

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

export default function PathList({ courses }: { courses: Course[] }) {
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);
  const [evidence, setEvidence] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load saved progress from this browser once, when the page opens
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setProgress(parsed);
        }
      }
    } catch {
      // If saved data is unreadable, we simply start fresh
    }
    setLoaded(true);
  }, []);

  function save(next: Progress) {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Saving can fail (e.g. private mode); the page still works for now
    }
  }

  function markCompleted(id: string) {
    const raw = (evidence[id] ?? "").trim();
    let certificateUrl: string | undefined;

    if (raw) {
      const cleaned = cleanUrl(raw);
      if (!cleaned) {
        setErrors({
          ...errors,
          [id]: "Please paste a full link starting with https:// (or leave the field empty).",
        });
        return;
      }
      certificateUrl = cleaned;
    }

    setErrors({ ...errors, [id]: "" });
    const today = new Date().toISOString().slice(0, 10);
    save({
      ...progress,
      [id]: { completedAt: today, ...(certificateUrl ? { certificateUrl } : {}) },
    });
  }

  function undoCompletion(id: string) {
    const next = { ...progress };
    delete next[id];
    save(next);
  }

  if (!loaded) {
    return <p className="mt-10 text-deep/60">Loading your progress...</p>;
  }

  const completedCount = courses.filter((c) => progress[c.id]).length;
  const percent = Math.round((completedCount / courses.length) * 100);

  return (
    <div className="mt-10">
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-display text-lg font-bold">Your progress</span>
          <span className="text-sm text-deep/70">
            {completedCount} of {courses.length} completed
          </span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-sand">
          <div
            className="h-full rounded-full bg-sea transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {completedCount === courses.length && (
        <p className="mt-6 rounded-2xl bg-sand p-4 font-medium">
          Well done! You have completed every course available so far. More
          courses are being verified and will be added soon.
        </p>
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
                    Locked: complete course {previous.order} first.
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

                <p className="mt-4">{course.description}</p>

                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-deep/60">Course access</dt>
                    <dd>{capitalize(course.courseAccess)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Reward</dt>
                    <dd>
                      {capitalize(course.rewardCost)} {course.rewardType}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Level</dt>
                    <dd>
                      {capitalize(course.level)} (
                      {course.levelSource === "provider"
                        ? "stated by provider"
                        : "our assessment"}
                      )
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Duration</dt>
                    <dd>{course.duration}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Language</dt>
                    <dd>{course.language}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Subtitles</dt>
                    <dd>{course.subtitles}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Account needed</dt>
                    <dd>{course.accountRequired}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-deep/60">Last verified</dt>
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
                    Go to course (opens {course.provider})
                  </a>
                </div>

                {!isCompleted && (
                  <div className="mt-5 rounded-2xl bg-chalk p-4">
                    <label
                      htmlFor={`evidence-${course.id}`}
                      className="block text-sm font-semibold"
                    >
                      Certificate or award link (optional)
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
                      <p className="mt-2 text-sm text-red-700">
                        {errors[course.id]}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => markCompleted(course.id)}
                      className="mt-3 rounded-full border-2 border-sea px-6 py-2 text-sm font-semibold text-sea hover:bg-sea hover:text-white"
                    >
                      Mark as Completed
                    </button>
                    <p className="mt-3 text-xs text-deep/70">
                      Opening the course does not count as completion. Come
                      back and confirm once you have really finished it. The
                      link is optional and is not checked by FreeLearn.
                    </p>
                  </div>
                )}

                {isCompleted && (
                  <div className="mt-5 space-y-2 text-sm">
                    <p className="font-semibold text-sea">
                      Completed on {progress[course.id].completedAt}
                    </p>
                    {safeLink && (
                      <p className="text-deep/80">
                        Your evidence link (not verified by FreeLearn):{" "}
                        <a
                          href={safeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sea underline"
                        >
                          open
                        </a>
                      </p>
                    )}
                    {canUndo && (
                      <button
                        type="button"
                        onClick={() => undoCompletion(course.id)}
                        className="text-deep/70 underline hover:text-deep"
                      >
                        Undo
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
