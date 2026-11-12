type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}
