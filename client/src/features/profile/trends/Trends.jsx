import { useOutletContext } from "react-router-dom";
import LinePlot from "./LinePlot";

export default function Trends() {
  const [signIns, id] = useOutletContext();

  return (
    <section className="trends">
      <LinePlot signIns={signIns} />
    </section>
  );
}
