type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
};

export default function Button({ label, variant = "primary" }: ButtonProps) {
  const styles =
    variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200 text-black";

  return <button className={`px-4 py-2 rounded ${styles}`}>{label}</button>;
}
