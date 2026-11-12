export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold">Catalogue</h1>
        <p>Découvrez tous nos produits</p>
      </div>
      {children}
    </section>
  );
}
