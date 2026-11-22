import { courses } from "@/data/courses";
import PathList from "@/components/PathList";

export default function PathPage() {
  // Sort by order so the path always follows the intended progression
  const path = [...courses].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Learning path
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Digital Marketing</h1>
        <p className="mt-4 text-slate-600">
          Follow the courses in order, one at a time. Every fact below was
          checked on the provider&apos;s official page on the date shown.
          Course access and rewards are checked separately.
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Honest note: we cannot see your progress on other websites, so you
          confirm completion yourself. Your progress is saved in this browser
          only.
        </p>

        <PathList courses={path} />

        <p className="mt-10 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
          More courses are being verified and will be added to this path soon.
        </p>
      </div>
    </main>
  );
}