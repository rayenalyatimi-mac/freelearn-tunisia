import { courses } from "@/data/courses";

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function PathPage() {
  const path = [...courses].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Learning path
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Digital Marketing</h1>
        <p className="mt-4 text-slate-600">
          Courses are listed in the order we recommend. Every fact below was
          checked on the provider&apos;s official page on the date shown.
          Course access and rewards are checked separately.
        </p>

        <ol className="mt-10 space-y-6">
          {path.map((course) => (
            <li
              key={course.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
                  {course.order}
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

              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Go to course (opens {course.provider})
              </a>
            </li>
          ))}
        </ol>

        <p className="mt-10 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
          More courses are being verified and will be added to this path soon.
        </p>
      </div>
    </main>
  );
}
