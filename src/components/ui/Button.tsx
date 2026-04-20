type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 rounded-md font-semibold transition text-white 
        ${
          disabled
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
        }`}
    >
      {label}
    </button>
  );
}
