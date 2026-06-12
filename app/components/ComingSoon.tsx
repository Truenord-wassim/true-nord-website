export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl">{title}</h1>
      <p className="mt-4 text-base text-navy/70">This page is coming soon.</p>
    </div>
  );
}
