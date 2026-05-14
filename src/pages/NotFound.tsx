export const NotFoundPage = () => {
  return (
    <main className="min-h-screen bg-primary-light px-4 py-16 text-primary-text_black">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col items-center justify-center text-center">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border border-primary/10 bg-primary-light_yellow text-4xl font-semibold text-primary shadow-sm">
          404
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Page not found
        </p>

        <h1 className="mb-4 max-w-2xl text-4xl font-bold text-primary sm:text-5xl">
          This memorial page could not be found
        </h1>

        <p className="mb-8 max-w-xl text-base leading-7 text-primary-text_black/80 sm:text-lg">
          The page you are looking for may have been moved, removed, or is not
          available yet.
        </p>

        <a
          href="/home"
          className="rounded-md border-4 border-primary-hover_light bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover_light hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Return to Home
        </a>
      </section>
    </main>
  );
};
