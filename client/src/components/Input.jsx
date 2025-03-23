export default function Input({ containerClassName, className, type, name, value, onChange, placeholder, error, errorMsg, variant = "default" }) {
  return (
    <div className={`${containerClassName} flex-1 flex flex-col gap-1`}>
      {variant === "full" && (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} flex-1 w-full border-2  rounded-md p-4 text-lg ${error ? " border-red-500" : " border-gray-400"}`}
        />
      )}

      {variant === "default" && (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500 border-red-500" : " focus:ring-black border-gray-300"
          }`}
        />
      )}
      {error && <div className="text-sm text-red-500">{errorMsg}</div>}
    </div>
  );
}
