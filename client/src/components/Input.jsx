import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

export default function Input({
  containerClassName,
  className,
  type,
  name = "",
  value,
  onChange,
  placeholder,
  error,
  errorMsg,
  variant = "default",
  password = false,
}) {
  const [isPassword, isPasswordSet] = useState(password ?? false);
  const [minDateTime, setMinDateTime] = useState("");

  useEffect(() => {
    if (type === "datetime-local") {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      const formatted = now.toISOString().slice(0, 16);
      setMinDateTime(formatted);
    }
  }, [type]);

  return (
    <div className={`${containerClassName} relative flex-1 flex flex-col gap-1`}>
      {variant === "full" && (
        <input
          {...(type === "datetime-local" ? { min: minDateTime } : {})}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} flex-1 w-full border-2  rounded-md p-4 text-lg ${error ? " border-red-500" : " border-gray-400"}`}
        />
      )}

      {variant === "textArea" && (
        <textarea
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} flex-1 w-full border-2 min-h-52 max-h-52 resize-none rounded-md p-4 text-lg ${
            error ? " border-red-500" : " border-gray-400"
          }`}
        />
      )}

      {variant === "default" && (
        <>
          <input
            {...(type === "datetime-local" ? { min: minDateTime } : {})}
            type={password ? (isPassword ? "password" : "text") : type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${className} ${password && "!pr-10"} w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              error ? "focus:ring-red-500 border-red-500" : " focus:ring-black border-gray-300"
            }`}
          />

          {password && (
            <button
              onClick={() => isPasswordSet(pre => !pre)}
              className="size-10 p-1 z-[1] cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              {!isPassword ? <GoEye /> : <GoEyeClosed />}
            </button>
          )}
        </>
      )}

      {error && <div className="text-sm text-red-500">{errorMsg}</div>}
    </div>
  );
}
