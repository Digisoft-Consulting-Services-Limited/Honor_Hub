export default function AccountInformationForm() {
  return (
    <section className="p-5">
      <form className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-primary">Full name</span>
          <input className="w-full rounded-md border border-primary-hover_light bg-primary-light px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary-hover_light" defaultValue="Salome" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-primary">Email</span>
          <input className="w-full rounded-md border border-primary-hover_light bg-primary-light px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary-hover_light" defaultValue="admin@honorhub.com" />
        </label>
        <div className="md:col-span-2">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-light hover:bg-border" type="button">
            Save account
          </button>
        </div>
      </form>
    </section>
  );
}
