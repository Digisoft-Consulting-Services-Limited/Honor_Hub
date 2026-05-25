export const inputClass =
  'w-full rounded-md border border-primary-hover_light bg-primary-light px-3 py-2 text-sm text-primary-text_black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-hover_light';

export default function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-primary">{label}</span>
      {children}
    </label>
  );
}
