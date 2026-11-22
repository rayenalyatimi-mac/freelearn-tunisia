"use client";

import { useEffect, useState } from "react";
import type { Course } from "@/data/courses";

const STORAGE_KEY = "freelearn-progress-v1";

// For each completed course id we remember the date it was confirmed.
type Progress = Record<string, { completedAt: string }>;

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PathList({ courses }: { courses: Course[] }) {
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);

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
    const today = new Date().toISOString().slice(0, 10);
    save({ ...progress, [id]: { completedAt: today } });
  }

  function undoCompletion(id: string) {
    const next = { ...progress };
    delete next[id];
    save(next);
  }

  if (!loaded) {
    return <p className="mt-10 text-slate-500">Loading your progress...</p>;
  }

  const completedCount = courses.filter((c) => progress[c.id]).length;
  const percent = Math.round((completedCount / courses.length) * 100);

  return (
    <div className="mt-10">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">Your progress</span>
          <span className="text-slate-600">
            {completedCount} of {courses.length} completed
          </span>
        </div>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {completedCount === courses.length && (
        <p className="mt-6 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          Well done! You have completed every course available so far. More
          courses are being verified and will be added soon.
        </p>
      )}

      <ol className="mt-8 space-y-6">
        {courses.map((course, index) => {
          const isCompleted = Boolean(progress[course.id]);
          const previous = courses[index - 1];
          const isUnlocked = index === 0 || Boolean(progress[previous.id]);
          const next = courses[index + 1];
          // Undo is only allowed on the latest completed course,
          // so later courses never stay unlocked by mistake.
          const canUndo = isCompleted && !(next && progress[next.id]);

          if (!isUnlocked) {
            return (
              <li
                key={course.id}
                className="rounded-xl border border-dashed border-slate-300 bg-slate-100 p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-400 font-bold text-white">
                    {course.order}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-500">
                      {course.title}
                    </h2>
                    <p className="text-sm text-slate-500">{course.provider}</p>
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      Locked: complete course {previous.order} first.
                    </p>
                  </div>
                </div>
              </li>
            );
          }

          return (
            <li
              key={course.id}
              className={`rounded-xl border bg-white p-6 shadow-sm ${
                isCompleted ? "border-emerald-300" : "border-slate-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                  {isCompleted ? "✓" : course.order}
                </span>
                <div>
                  <h2 className="text-xl font-semibold">{course.title}</h2>
                  <p className="text-sm text-slate-500">{course.provider}</p>
                </div>
              </div>

              <p className="mt-4 text-slate-700">{course.description}</p>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-slate-500">Course access</dt>
                  <dd>{capitalize(course.courseAccess)}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Reward</dt>
                  <dd>
                    {capitalize(course.rewardCost)} {course.rewardType}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Level</dt>
                  <dd>
                    {capitalize(course.level)} (
                    {course.levelSource === "provider"
                      ? "stated by provider"
                      : "our assessment"}
                    )
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Duration</dt>
                  <dd>{course.duration}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Language</dt>
                  <dd>{course.language}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Subtitles</dt>
                  <dd>{course.subtitles}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Account needed</dt>
                  <dd>{course.accountRequired}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-500">Last verified</dt>
                  <dd>{course.lastVerified}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Go to course (opens {course.provider})
                </a>

                {!isCompleted && (
                  <button
                    type="button"
                    onClick={() => markCompleted(course.id)}
                    className="rounded-lg border border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                  >
                    Mark as Completed
                  </button>
                )}

                {isCompleted && (
                  <span className="text-sm font-medium text-emerald-700">
                    Completed on {progress[course.id].completedAt}
                  </span>
                )}

                {canUndo && (
                  <button
                    type="button"
                    onClick={() => undoCompletion(course.id)}
                    className="text-sm text-slate-500 underline hover:text-slate-700"
                  >
                    Undo
                  </button>
                )}
              </div>

              {!isCompleted && (
                <p className="mt-3 text-xs text-slate-500">
                  Opening the course does not count as completion. Come back
                  and confirm once you have really finished it.
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}