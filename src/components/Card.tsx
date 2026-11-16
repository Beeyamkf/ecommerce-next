type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_12px_32px_-12px_rgba(37,99,235,0.35)] ${className}`}
    >
      <h2 className="text-xl font-bold mb-3 text-slate-900">{title}</h2>
      {children}
    </div>
  );
}
