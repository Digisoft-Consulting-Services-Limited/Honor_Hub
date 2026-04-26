export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to My App 👋
      </h1>

      <p className="text-gray-600 text-center max-w-md">
        This is a simple homepage built with Next.js. Start editing
        <code className="bg-gray-100 px-1 mx-1 rounded">page.tsx</code>
        to customize it.
      </p>

      <button className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
        Get Started
      </button>
    </main>
  );
}