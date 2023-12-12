import ReactSwitch from "react-switch";

export default function ToggleSwitch(checked, setChecked) {
  return (
    <ReactSwitch checked={checked} onChange={() => setChecked(!checked)} />
  );
}
