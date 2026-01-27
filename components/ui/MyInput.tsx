import { useId } from "react";

interface MyInputProps {
  type?: "password" | "text" | "email";
  value: string;
  onChange: () => void;
  label?: string;
  required?: boolean;
}

function MyInput({
  type = "text",
  value,
  onChange,
  label = "",
  required = false,
}: MyInputProps) {
  const id = useId();
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        required={required}
        onChange={onChange}
        value={value}
        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
        type={type}
      />
    </>
  );
}

export default MyInput;
