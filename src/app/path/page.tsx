import { courses } from "@/data/courses";
import PathList from "@/components/PathList";

export default function PathPage() {
  // Sort by order so the path always follows the intended progression
  const path = [...courses].sort((a, b) => a.order - b.order);

  return (
    <main>
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Digital Marketing
        </h1>
        <p className="mt-4 max-w-xl text-lg text-deep/80">
          Follow the courses in order, one at a time. Each fact below was
          checked on the provider&apos;s official page on the date shown.
          Course access and rewards are checked separately.
        </p>
        <p className="mt-3 max-w-xl text-sm text-deep/70">
          We cannot see your progress on other websites, so you confirm
          completion yourself. Your progress is saved in this browser only.
        </p>

        <PathList courses={path} />

        <p className="mt-10 rounded-2xl border border-dashed border-deep/25 p-4 text-sm text-deep/70">
          More courses are being verified and will be added to this path soon.
        </p>
      </div>
    </main>
  );
}