export default function ActionsBtn({ handleClick, children }) {
  return (
    <button type="button" onClick={() => handleClick()} className="actions-btn">
      {children}
    </button>
  );
}
