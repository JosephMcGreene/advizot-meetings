export default function RatingOrPriority({ title, text, className }) {
  return (
    <span className={className}>
      <u>{title}</u>

      <br />

      {text}
    </span>
  );
}
