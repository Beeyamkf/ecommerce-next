"use client";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  onClick?: () => void;
};

const styles = {
  primary: "bg-blue-600 shadow-[0_5px_0_0_#1e40af] hover:bg-blue-500",
  secondary: "bg-slate-600 shadow-[0_5px_0_0_#334155] hover:bg-slate-500",
  danger: "bg-red-600 shadow-[0_5px_0_0_#991b1b] hover:bg-red-500",
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
      className={`w-full px-4 py-2.5 rounded-xl text-white font-semibold transition-all active:translate-y-[5px] active:shadow-none ${styles[variant]}`}
    >
      {label}
    </button>
  );
}
