export default function PasscodeDisplay() {
  const passcode = localStorage.getItem("passcode");

  return (
    <aside className="passcode-display">
      <h2>{passcode}</h2>
    </aside>
  );
}
