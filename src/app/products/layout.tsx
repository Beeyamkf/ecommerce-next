export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold">Catalog</h1>
        <p>Discover all our products </p>
      </div>
      {children}
    </section>
  );
}
