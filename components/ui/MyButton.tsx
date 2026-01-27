import React from "react";

interface MyInputProps {
  type?: "button" | "submit";
  label: string;
  onClick?: () => void;
}

function MyButton({ type, label, onClick }: MyInputProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-gray-700 cursor-pointer text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
    >
      {label}
    </button>
  );
}

export default MyButton;
