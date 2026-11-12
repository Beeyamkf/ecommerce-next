"use client";
type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  label,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const styles =
    variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200 text-black";

  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${styles}`}>
      {label}
    </button>
  );
}
