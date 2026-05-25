export default function MemorialStatusBadge({ status = 'Draft' }: { status?: 'Draft' | 'Published' }) {
  return (
    <span className="rounded bg-primary px-2 py-1 text-xs font-medium uppercase text-primary-light">
      {status}
    </span>
  );
}
