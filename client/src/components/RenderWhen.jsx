export default function RenderWhen({ is, children }) {
  return is ? children : null;
}
