export default function Input({ containerClassName, className, type, name, value, onChange, placeholder, error, errorMsg }) {
  return (
    <div className={`${containerClassName} w-full flex flex-col gap-1`}>
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
      <div className="text-sm text-red-500">{errorMsg}</div>
    </div>
  );
}
