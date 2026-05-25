import Link from 'next/link';

export default function CreateMemorialInlineForm() {
  return (
    <div className="rounded-lg border border-dashed border-primary-hover_light bg-primary-light p-5">
      <h3 className="text-lg font-semibold text-primary">Create an online memorial</h3>
      <p className="mt-1 text-sm text-primary-text_black/70">
        Start with the honoree identity, then add tributes, stories, program details, and hymns.
      </p>
      <Link href="/admin/memorials/demo/about" className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border">
        Begin
      </Link>
    </div>
  );
}
