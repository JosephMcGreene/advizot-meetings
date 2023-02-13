export default function Priority({ title, text, className }) {
  return (
    <span className={className}>
      <strong>{title}</strong>

      <br />

      {text}
    </span>
  );
}
