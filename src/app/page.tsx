import Link from "next/link";
import { courses } from "@/data/courses";

export default function Home() {
  // The trail shows the first real courses from the data file
  const trail = [...courses].sort((a, b) => a.order - b.order).slice(0, 3);

  return (
    <main>
      <section className="mx-auto grid max-w-5xl gap-14 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Free courses, checked one by one.
          </h1>
          <p className="mt-6 max-w-md text-lg text-deep/80">
            FreeLearn Tunisia is a free project for university students. We
            check every course on its official page and tell you what is
            free: the course, the certificate, or both. Finish one course to
            unlock the next.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/path"
              className="rounded-full bg-sea px-7 py-3 font-semibold text-white hover:bg-deep"
            >
              Start the Digital Marketing path
            </Link>
            <a
              href="#how"
              className="font-semibold text-sea underline underline-offset-4"
            >
              How we check courses
            </a>
          </div>
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
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-3">
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