export default function Label({ name = "", className = "" }) {
  return <div className={`${className} text-lg font-bold w-72`}>{name}</div>;
}
