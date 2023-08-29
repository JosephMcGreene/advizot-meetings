export default function ActionsBtn({ handleNewResponseClick, children }) {
  return (
    <button
      type="button"
      onClick={() => handleNewResponseClick()}
      className="actions-btn"
    >
      {children}
    </button>
  );
}
