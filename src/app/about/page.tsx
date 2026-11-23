import CreatorName from "@/components/CreatorName";
export const metadata = {
  title: "About FreeLearn Tunisia",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        About FreeLearn Tunisia
      </h1>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">Why I built it</h2>
        <p className="mt-2 text-deep/80">
          Good free courses exist, but they are scattered across many websites,
          and it is hard to know what is really free: the course, the
          certificate, or both. I am a Tunisian university student, and I
          built FreeLearn to put checked free courses in one clear path, one
          course at a time.
        </p>
        <p className="mt-3 font-semibold"><CreatorName /></p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">How courses are chosen</h2>
        <p className="mt-2 text-deep/80">
          A course is added only after it is checked on the provider&apos;s
          official page. Course access and the certificate are checked
          separately, and each course shows the date it was last verified.
          FreeLearn does not copy any course content: every course links to
          its original provider, whose prices and conditions can change.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">Your progress</h2>
        <p className="mt-2 text-deep/80">
          FreeLearn cannot see what you do on other websites, so you confirm
          completion yourself. An account is optional: without one, your
          progress stays in your browser.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold">Free and open</h2>
        <p className="mt-2 text-deep/80">
          FreeLearn is a free, non-profit project. You can read the code and
          the course verification notes on{" "}
          <a
            href="https://github.com/rayenalyatimi-mac/freelearn-tunisia"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sea underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </section>
    </main>
  );
}