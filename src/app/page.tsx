import Link from "next/link";
import { courses } from "@/data/courses";

export default function Home() {
  // The trail shows the first real courses from the data file
  const trail = [...courses].sort((a, b) => a.order - b.order).slice(0, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-12 md:grid-cols-2 md:items-center md:gap-14 md:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sea">
            A free project for Tunisian university students
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Learn one free course at a time, in the right order.
          </h1>
          <p className="mt-6 max-w-md text-lg text-deep/80">
            Every course is checked on its official page, so you know whether
            the course and the certificate are really free.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/path"
              className="rounded-full bg-sea px-7 py-3 text-center font-semibold text-white hover:bg-deep"
            >
              Start the Digital Marketing path
            </Link>
            <a
              href="#how"
              className="py-2 text-center font-semibold text-sea underline underline-offset-4 sm:text-left"
            >
              How we check courses
            </a>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-deep/80">
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-bold text-sea">✓</span>
              Course and certificate are checked separately
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-bold text-sea">✓</span>
              The last-verified date is shown on every course
            </li>
            <li className="flex gap-2">
              <span aria-hidden="true" className="font-bold text-sea">✓</span>
              No account needed to start
            </li>
          </ul>
        </div>

        <ol className="relative space-y-5 border-l-2 border-dashed border-deep/25 pl-8">
          {trail.map((course, i) => (
            <li key={course.id} className="relative">
              <span
                className={`absolute -left-[3.07rem] top-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  i === 0 ? "bg-saffron text-deep" : "bg-sand text-deep/60"
                }`}
              >
                {course.order}
              </span>
              <div
                className={`rounded-2xl px-5 py-4 ${
                  i === 0
                    ? "bg-white shadow-md ring-2 ring-saffron"
                    : "bg-sand/60"
                }`}
              >
                <p className="font-display font-bold">{course.title}</p>
                <p className="text-sm text-deep/70">{course.provider}</p>
                <p className="mt-2 text-sm font-semibold">
                  {i === 0
                    ? "Open now"
                    : `Unlocks after course ${course.order - 1}`}
                </p>
              </div>
            </li>
          ))}
          <li className="text-sm text-deep/70">
            More courses are being verified.
          </li>
        </ol>
      </section>

      <section id="how" className="border-t border-deep/10 bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-3 md:py-16">
          <div>
            <h2 className="font-display text-xl font-bold">
              Checked on the official page
            </h2>
            <p className="mt-2 text-deep/80">
              Every course shows the date we last verified it, so you know how
              fresh the information is.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">
              Course and certificate, priced separately
            </h2>
            <p className="mt-2 text-deep/80">
              A course can be free while its certificate is not. We say which,
              using the provider&apos;s own word, such as certificate or award.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">
              You confirm your own progress
            </h2>
            <p className="mt-2 text-deep/80">
              We cannot see what you do on other websites. When you finish a
              course, you tell us, and the next one opens.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}