type InputProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  defaultValue?: string | number;
  errors?: string[];
};

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  errors,
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full border rounded px-3 py-2 bg-transparent ${
          errors ? "border-red-500" : "border-gray-400"
        }`}
      />
      {errors?.map((error) => (
        <p key={error} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      ))}
    </div>
  );
}
