export default function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-primary-hover_light bg-white p-5 shadow-sm">
      <div className="mb-5 border-b border-primary-hover_light pb-4">
        <h1 className="text-2xl font-semibold text-primary">{title}</h1>
        <p className="mt-1 text-sm leading-6 text-primary-text_black/70">{description}</p>
      </div>
      {children}
    </section>
  );
}
