# FreeLearn Tunisia

A free, non-profit student project that helps Tunisian university students follow a clear learning path made of free online courses.

**Live site:** https://freelearn-tunisia.vercel.app

## What it does

- Shows a learning path (first path: Digital Marketing) in a recommended order.
- Locks each course until the previous one is marked as completed.
- States clearly what is free: course access and certificate are checked separately, using the provider's own wording (certificate, award...).
- Shows the date each course was last verified on its official page.
- Saves progress in the student's own browser. Completion is self-declared, and an optional certificate link can be added. FreeLearn does not verify it.

## Principles

- A course is added only after it is checked on the provider's official page.
- No course content is copied. Every course links to its original provider.
- The verification notes are public: see docs/course-verification.md.

## Tech

Next.js, TypeScript, Tailwind CSS, hosted on Vercel.

## Run it locally

Install the dependencies with `npm install`, start the site with `npm run dev`, then open http://localhost:3000.

## Status

Early version, built and tested by one student. Currently 2 verified courses; more are being verified one at a time.

## License

No license has been chosen yet, so all rights are reserved for now.