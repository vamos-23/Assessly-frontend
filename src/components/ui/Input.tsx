type Props = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg 
          bg-white/5 border text-white placeholder-gray-400
          focus:outline-none transition
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/50"
              : "border-white/10 focus:ring-2 focus:ring-blue-500/50"
          }`}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}