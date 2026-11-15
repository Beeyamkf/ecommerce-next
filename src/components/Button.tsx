"use client";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  onClick?: () => void;
};

const styles = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-600 text-white",
  danger: "bg-red-600 text-white",
};

export default function Button({
  label,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 rounded ${styles[variant]}`}
    >
      {label}
    </button>
  );
}
