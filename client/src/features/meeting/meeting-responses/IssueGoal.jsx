export default function IssueGoal({ title, className, text, setEditingMode }) {
  return (
    <article className={className}>
      <h4>
        <strong>{title}</strong>
      </h4>

      <br />

      {text}
    </article>
  );
}
