export default async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mt-auto">
      <div className="max-w-6xl mx-auto p-4 text-center text-sm text-gray-500">
        © {year} MyShop. Tous droits réservés.
      </div>
    </footer>
  );
}
