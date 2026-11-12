import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="p-8 grid gap-4 md:grid-cols-2">
      <Card title="Produit 1">
        <p className="mb-4">Description courte du produit 1</p>
        <Button label="Acheter" />
      </Card>

      <Card title="Produit 2">
        <p className="mb-4">Description courte du produit 2</p>
        <Button label="Détails" variant="secondary" />
      </Card>
    </main>
  );
}
