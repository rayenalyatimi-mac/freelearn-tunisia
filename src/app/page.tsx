import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-700">
          FreeLearn Tunisia
        </p>

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
          Learn one course at a time.
          <br />
          Build skills that matter.
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          A free project for Tunisian university students: a clear learning
          path made of carefully checked free courses, with honest information
          about what is free and what is not.
        </p>

        <Link
          href="/path"
          className="mt-10 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Start the Digital Marketing path
        </Link>
      </section>
    </main>
  );
}