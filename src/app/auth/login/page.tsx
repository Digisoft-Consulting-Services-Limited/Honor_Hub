import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-light px-4 py-12 text-primary-text_black">
      <section className="grid w-full max-w-3xl gap-8 rounded-lg bg-primary-light_yellow p-8 shadow-md md:grid-cols-2">
        <div>
          <h1 className="mb-6 text-2xl font-semibold text-primary">HonorHub</h1>
          <h2 className="mb-3 text-xl font-semibold">Welcome Back</h2>
          <p className="text-sm leading-6 text-primary-text_black/75">
            Continue to HonorHub to view memorials, share memories, and honor
            loved ones.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <Link
            href="/home"
            className="rounded-md border-4 border-primary-hover_light bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover_light hover:text-primary"
          >
            Continue to HonorHub
          </Link>

          <p className="text-center text-sm text-primary-text_black/75">
            Do not have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
